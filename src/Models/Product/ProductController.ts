import * as express from "express";
import BaseController from "../../Base/BaseController";
import ProductService from "./ProductService";

export default class ProductController extends BaseController {

    /**
     * The productSchema service.
     */
    protected productService: ProductService;

    constructor() {
        super();

        this.productService = new ProductService();
    }

    /**
     * Defining the routes.
     */
    public routes() {
        this.router.get("/products", async (req: express.Request, res: express.Response) => {
            try {
                const products = await this.productService.getAll();
                res.status(200).send(products);
            } catch (e) {
                BaseController.generalError(res);
                console.error(e);
            }
        });

        this.router.get("/productSchema/:id", async (req: express.Request, res: express.Response) => {
            const loadedProduct = await this.productService.load(req.params.id);

            if (!loadedProduct) {
                res
                    .status(404)
                    .send({message: "The item does no exists"});
                return;
            }

            res.status(200).send(loadedProduct);
        });

        this.router.patch("/productSchema/:id", async (req: express.Request, res: express.Response) => {
            this.productService.update(req.params.id, req.body, (err, product) => {
                if (err) {
                    BaseController.generalError(res, BaseController.handleMongooseError(err));
                    return;
                }

                res.status(203).send(product);
            });
        });

        this.router.post("/productSchema", async (req: express.Request, res: express.Response) => {
            try {
                res.status(201).send(await this.productService.create(req.body));
            } catch (e) {
                BaseController.generalError(res, BaseController.handleMongooseError(e.errors));
            }
        });

        this.router.delete("/productSchema/:id", async (req: express.Request, res: express.Response) => {
            this.productService.delete(req.params.id)
                .then(() => {
                    res.status(200).send({message: "removed"})
                })
                .catch((error) => {
                    if (error != "item_not_exists") {
                        BaseController.generalError(res);
                        return;
                    }

                    BaseController.generalError(res, {error: "The item does no exists"}, 404);
                });
        });
    }
}
