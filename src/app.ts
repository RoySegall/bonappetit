import * as bodyParser from "body-parser";
import * as express from "express";
import ProductController from "./Models/Product/ProductController";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.setUp();
    }

    private setUp(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Adding product routes.
        this.app.use("/", new ProductController().router);
    }
}

export default new App().app;
