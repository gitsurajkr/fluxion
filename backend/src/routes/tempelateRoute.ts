import express from "express";
import Tempelate from "../controller/Tempelate.ts";

class TempelateRoutes {
    router = express.Router();

    constructor() {
        this.init();
    }

    private init() {
        this.router.post("/add-template", Tempelate.addTemplate);
        this.router.delete("/delete-template/:id", Tempelate.deleteTemplate);
        this.router.put("/update-template/:id", Tempelate.updateTempelate);
        this.router.get("/get-template/:id", Tempelate.getTemplateById);
        this.router.get("/get-all-templates", Tempelate.getAllTemplates);
    }
}

export default new TempelateRoutes().router;