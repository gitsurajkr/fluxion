import express from "express";
import routes from "./routes/rootRouter.ts";

class Server {
    public app = express();
    private port = process.env.PORT || 3000;

    constructor() {
        this.config();
        this.routes();
        this.start();
    }

    private config() {
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
