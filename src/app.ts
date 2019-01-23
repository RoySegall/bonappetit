import * as bodyParser from "body-parser";
import * as express from "express";
import ProductController from "./Models/Product/ProductController";
import RecipeController from "./Models/Recipe/RecipeController";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.setUp();
    }

    private setUp(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Adding productSchema routes.
        this.app.use("/", new ProductController().router);
        this.app.use("/", new RecipeController().router);
    }
}

export default new App().app;
