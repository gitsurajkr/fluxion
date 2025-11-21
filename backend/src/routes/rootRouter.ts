import express from "express";
import userRoutes from "./userRoute.ts";

class AppRoutes {
    public router = express.Router();

    constructor() {
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.use("/users", userRoutes);
        // this.router.use("/products", productRoutes);
        // this.router.use("/orders", orderRoutes);
    }
}

export default new AppRoutes().router;
