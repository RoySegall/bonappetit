import * as express from "express";
import BaseController from "../Base/BaseController";
import RecipeService from "../Models/Recipe/RecipeService";

export default class GeneralController extends BaseController {

    /**
     * The productSchema service.
     */
    protected recipeService: RecipeService;

    constructor() {
        super();

        this.recipeService = new RecipeService();
    }

    /**
     * Defining the routes.
     */
    public routes() {
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            res.status(200).send({"status": "working"});
        });

        this.router.post("/search/recipes", async (req: express.Request, res: express.Response) => {
            if (req.body.ids == undefined) {
                BaseController.generalError(res, {message: "The products IDs are missing"});
                return;
            }

            if (req.body.strategy === undefined) {
                BaseController.generalError(res, {message: "The search strategy is missing"});
                return;
            }

            if (['exact', 'contains'].indexOf(req.body.strategy) === -1) {
                BaseController.generalError(res, {message: "The search strategy can be only 'exact' or 'contains'"});
                return;
            }


            res.status(200).send({results: this.recipeService.search(req.body.ids, req.body.strategy)});
        });
    }
}
