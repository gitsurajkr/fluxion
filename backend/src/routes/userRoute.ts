import express from "express";
import userController from "../controller/userController.ts";
import AuthMiddleware from "../middleware/auth.ts";

class UserRoutes { 
    router = express.Router();

    constructor() {
        this.init();
    }

    private init() {
        this.router.post("/signup", userController.RegisterUser);
        this.router.post("/login", userController.LoginUser);

        this.router.get("/profile", AuthMiddleware.authenticateToken, userController.getUserProfile);
        this.router.put("/update-profile", AuthMiddleware.authenticateToken, userController.updateUserProfile);
        this.router.delete("/account", AuthMiddleware.authenticateToken, userController.deleteUserAccount);

        this.router.post("/logout", AuthMiddleware.authenticateToken, userController.LogoutUser);
        this.router.get("/:id", AuthMiddleware.authenticateToken, userController.getUserById);
    }
}

export default new UserRoutes().router;
