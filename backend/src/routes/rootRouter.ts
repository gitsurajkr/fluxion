import express from "express";
import userRoutes from "./userRoute.ts";
import tempelateRoutes from "./tempelateRoute.ts";
class AppRoutes {
    public router = express.Router();

    constructor() {
        this.registerRoutes();

    }

    private registerRoutes() {
        this.router.use("/user", userRoutes);
        this.router.use("/templates", tempelateRoutes);
        // this.router.use("/products", productRoutes);
        // this.router.use("/orders", orderRoutes);
    }
}

export default new AppRoutes().router;
