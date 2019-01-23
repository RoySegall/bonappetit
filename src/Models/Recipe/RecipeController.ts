import * as express from "express";
import BaseController from "../../Base/BaseController";
import RecipeService from "./RecipeService";

export default class RecipeController extends BaseController {

    /**
     * The productSchema service.
     */
    protected recipeService: RecipeService;

    constructor() {
        super();
        this.recipeService = new RecipeService();
    }

    public routes() {
        this.router.get("/recipes", async (req: express.Request, res: express.Response) => {
            try {
                const products = await this.recipeService.getAll();
                res.status(200).send(products);
            } catch (e) {
                BaseController.generalError(res);
                console.error(e);
            }
        });

        this.router.get("/recipe/:id", async (req: express.Request, res: express.Response) => {
            const loadedProduct = await this.recipeService.load(req.params.id);

            if (!loadedProduct) {
                res
                    .status(404)
                    .send({message: "The item does no exists"});
                return;
            }

            res.status(200).send(loadedProduct);
        });

        this.router.patch("/recipe/:id", async (req: express.Request, res: express.Response) => {
            this.recipeService.update(req.params.id, req.body, (err, product) => {
                if (err) {
                    BaseController.generalError(res, BaseController.handleMongooseError(err));
                    return;
                }

                res.status(203).send(product);
            });
        });

        this.router.post("/recipe", async (req: express.Request, res: express.Response) => {
            try {
                res.status(201).send(await this.recipeService.create(req.body));
            } catch (e) {
                BaseController.generalError(res, BaseController.handleMongooseError(e.errors));
            }
        });

        this.router.delete("/recipe/:id", async (req: express.Request, res: express.Response) => {
            this.recipeService.delete(req.params.id)
                .then(() => {
                    res.status(200).send({message: "removed"});
                })
                .catch((error) => {
                    if (error !== "item_not_exists") {
                        BaseController.generalError(res);
                        return;
                    }

                    BaseController.generalError(res, {error: "The item does no exists"}, 404);
                });
        });
    }

}
