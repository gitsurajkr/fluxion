import { prisma } from "../lib/prisma.ts";
import { Request, Response } from "express";
import ZodSchemas from "../lib/zodValidation.ts";

class CartController {

  // Get all cart items for current user
  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const cartItems = await prisma.cart.findMany({
        where: { userId },
        include: {
          tempelate: {
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              imageUrl: true,
              thumbnailUrl: true,
              isActive: true
            }
          },
          tempelateDetail: {
            select: {
              id: true,
              header: true,
              headerSubtitle: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Calculate totals
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cartItems.reduce((sum, item) =>
        sum + (item.tempelate.price * item.quantity), 0
      );

      res.status(200).json({
        message: "Cart fetched successfully",
        cart: cartItems,
        summary: {
          totalItems,
          totalPrice,
          itemCount: cartItems.length
        }
      });
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "An error occurred while fetching cart" });
    }
  }

  // Add template to cart or update quantity if exists
  async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const validation = ZodSchemas.CartSchema.safeParse(req.body);
      if (!validation.success) {
        res.status(400).json({
          message: "Validation error",
          errors: validation.error.issues
        });
        return;
      }

      let { tempelateId, tempelateDetailId, quantity } = validation.data;

      // If only tempelateDetailId provided, get tempelateId from it
      if (!tempelateId && tempelateDetailId) {
        const detail = await prisma.tempelateDetail.findUnique({
          where: { id: tempelateDetailId }
        });

        if (!detail) {
          res.status(404).json({ message: "Template model/detail not found" });
          return;
        }

        tempelateId = detail.tempelateId;
      }

      // Validate tempelateId is provided (either directly or from detail)
      if (!tempelateId) {
        res.status(400).json({ message: "Either tempelateId or tempelateDetailId is required" });
        return;
      }

      // Check if template exists and is active
      const template = await prisma.tempelate.findUnique({
        where: { id: tempelateId }
      });

      if (!template) {
        res.status(404).json({ message: "Template not found" });
        return;
      }

      if (template.isActive !== "ACTIVE") {
        res.status(400).json({ message: "Template is not available" });
        return;
      }

      // If template detail/model ID provided, validate it belongs to this template
      if (tempelateDetailId) {
        const detail = await prisma.tempelateDetail.findUnique({
          where: { id: tempelateDetailId }
        });

        if (!detail) {
          res.status(404).json({ message: "Template model/detail not found" });
          return;
        }

        if (detail.tempelateId !== tempelateId) {
          res.status(400).json({ message: "Template model does not belong to this template" });
          return;
        }
      }

      // Check if item already in cart (match by userId, tempelateId, AND tempelateDetailId)
      const existingCartItem = await prisma.cart.findFirst({
        where: {
          userId,
          tempelateId,
          tempelateDetailId: tempelateDetailId ?? null
        }
      });

      let cartItem;

      if (existingCartItem) {
        // Calculate new quantity
        const newQuantity = existingCartItem.quantity + quantity;

       
        if (newQuantity > 100) {
          res.status(400).json({
            message: `Cannot add ${quantity} items. Maximum 100 per template. Current: ${existingCartItem.quantity}`
          });
          return;
        }

        // Update quantity 
        cartItem = await prisma.cart.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: newQuantity
          },
          include: {
            tempelate: {
              select: {
                id: true,
                title: true,
                price: true,
                thumbnailUrl: true
              }
            },
            tempelateDetail: {
              select: {
                id: true,
                header: true,
                headerSubtitle: true
              }
            }
          }
        });
      } else {
        // Create new cart item
        cartItem = await prisma.cart.create({
          data: {
            userId,
            tempelateId,
            ...(tempelateDetailId && { tempelateDetailId }),
            quantity
          },
          include: {
            tempelate: {
              select: {
                id: true,
                title: true,
                price: true,
                thumbnailUrl: true
              }
            },
            tempelateDetail: {
              select: {
                id: true,
                header: true,
                headerSubtitle: true
              }
            }
          }
        });
      }

      res.status(existingCartItem ? 200 : 201).json({
        message: existingCartItem ? "Cart item updated" : "Template added to cart",
        cartItem
      });

    } catch (error: any) {
      console.error("Error adding to cart:", error);

      if (error.code === "P2002") {
        res.status(400).json({ message: "Item already in cart" });
        return;
      }

      res.status(500).json({ message: "An error occurred while adding to cart" });
    }
  }

  // Update cart item quantity
  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { cartItemId } = req.params;

      if (!cartItemId) {
        res.status(400).json({ message: "cartItemId is required" });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const validation = ZodSchemas.CartSchema.partial().safeParse(req.body);
      if (!validation.success) {
        res.status(400).json({
          message: "Validation error",
          errors: validation.error.issues
        });
        return;
      }

      const { quantity } = validation.data;

      if (quantity === undefined) {
        res.status(400).json({ message: "Quantity is required" });
        return;
      }

      // Verify cart item belongs to user before updating
      const existingItem = await prisma.cart.findUnique({
        where: { id: cartItemId }
      });

      if (!existingItem || existingItem.userId !== userId) {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      const cartItem = await prisma.cart.update({
        where: { id: cartItemId },
        data: { quantity },
        include: {
          tempelate: {
            select: {
              id: true,
              title: true,
              price: true
            }
          },
          tempelateDetail: {
            select: {
              id: true,
              header: true
            }
          }
        }
      });

      res.status(200).json({
        message: "Cart item updated successfully",
        cartItem
      });

    } catch (error: any) {
      console.error("Error updating cart item:", error);

      if (error.code === "P2025") {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      res.status(500).json({ message: "An error occurred while updating cart" });
    }
  }

  // Remove specific template from cart
  async removeFromCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { cartItemId } = req.params;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      if (!cartItemId) {
        res.status(400).json({ message: "cartItemId is required" });
        return;
      }

      // Verify cart item belongs to user before deleting
      const existingItem = await prisma.cart.findUnique({
        where: { id: cartItemId }
      });

      if (!existingItem || existingItem.userId !== userId) {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      await prisma.cart.delete({
        where: { id: cartItemId }
      });

      res.status(200).json({ message: "Item removed from cart" });

    } catch (error: any) {
      console.error("Error removing from cart:", error);
      // prisma error handling
      if (error.code === "P2025") {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      res.status(500).json({ message: "An error occurred while removing from cart" });
    }
  }

  // Clear entire cart for user
  async clearCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const deletedCount = await prisma.cart.deleteMany({
        where: { userId }
      });

      res.status(200).json({
        message: "Cart cleared successfully",
        deletedItems: deletedCount.count
      });

    } catch (error: any) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "An error occurred while clearing cart" });
    }
  }
}

export default new CartController();





