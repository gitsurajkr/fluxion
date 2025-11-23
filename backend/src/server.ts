import express from "express";
import routes from "./routes/rootRouter.ts";
import cors from "cors";

class Server {
    public app = express();
    private port = process.env.PORT || 5000;

    constructor() {
        this.config();
        this.routes();
        this.start();
    }

    private config() {
        // Enable CORS for frontend
        this.app.use(cors({
            origin: process.env.FRONTEND_URL || "http://localhost:4040",
            credentials: true,
        }));
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes() {
        this.app.use("/api", routes);
    }

    private start() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on port ${this.port}`);
        });
    }
}

new Server();
