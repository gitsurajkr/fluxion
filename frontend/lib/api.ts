const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
import axios from "axios";
import { 
  ApiResponse, 
  LoginData, 
  RegisterData, 
  TemplateDetail, 
  TemplateDetailResponse, 
  TemplateResponse,
  CartItem,
  CartResponse,
  AddToCartData,
  OrderResponse,
  CreateOrderData
} from ".";


export const authAPI = {
  async signup(data: RegisterData): Promise<ApiResponse> {
    const response = await axios.post(`${API_BASE_URL}/api/user/signup`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response.data;
    if (response.status !== 200) {
      throw new Error(result.message || "Signup failed");
    }
    return result;
  },

  async signin(data: LoginData): Promise<ApiResponse> {
    const response = await axios.post(`${API_BASE_URL}/api/user/signin`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response.data;
    if (response.status !== 200) {
      throw new Error(result.message || "Signin failed");
    }
    return result;
  },

  async getProfile(): Promise<ApiResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/user/get-profile`, {
      withCredentials: true,
    });
    const result = response.data;
    if (response.status !== 200) {
      throw new Error(result.message || "Failed to fetch profile");
    }
    return result;
  }
  
};


export const templateAPI = {
  async getAllTemplates(): Promise<TemplateResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/templates/get-all-templates`);
    return response.data;
  },

  async getTemplateById(id: string): Promise<TemplateResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/templates/get-template/${id}`);
    return response.data;
  },
};


export const templateDetailAPI = {
  async getTemplateDetailByTemplateId(templateId: string): Promise<TemplateDetailResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/template-details/get-by-template/${templateId}`);
    return response.data;
  },
};

export const cartAPI = {
  async getCart(): Promise<CartResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/cart`, {
      withCredentials: true,
    });
    return response.data;
  },

  async addToCart(data: AddToCartData): Promise<CartResponse> {
    const response = await axios.post(`${API_BASE_URL}/api/cart/add`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<CartResponse> {
    const response = await axios.put(
      `${API_BASE_URL}/api/cart/update/${cartItemId}`,
      { quantity },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  async removeFromCart(cartItemId: string): Promise<CartResponse> {
    const response = await axios.delete(
      `${API_BASE_URL}/api/cart/remove/${cartItemId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  async clearCart(): Promise<CartResponse> {
    const response = await axios.delete(`${API_BASE_URL}/api/cart/clear`, {
      withCredentials: true,
    });
    return response.data;
  },
};

export const orderAPI = {
  async createOrder(data: CreateOrderData): Promise<OrderResponse> {
    const response = await axios.post(
      `${API_BASE_URL}/api/orders/checkout`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  async getUserOrders(): Promise<OrderResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/orders`, {
      withCredentials: true,
    });
    return response.data;
  },

  async getOrderById(orderId: string): Promise<OrderResponse> {
    const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  async cancelOrder(orderId: string): Promise<OrderResponse> {
    const response = await axios.put(
      `${API_BASE_URL}/api/orders/${orderId}/cancel`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};

