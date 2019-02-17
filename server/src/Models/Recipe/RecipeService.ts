import * as mongoose from "mongoose";
import AbstractEntityService from "../../Base/AbstractEntityService";
import EntityService from "../../Base/EntityService";
import RecipeSchema from "./RecipeSchema";

export default class RecipeService extends AbstractEntityService implements EntityService {

    protected recipeSchema: any;

    constructor() {
        super();

        this.recipeSchema = mongoose.model("Recipe", RecipeSchema);
    }

    public getSchema() {
        return this.getRecipe();
    }

    public setRecipe(product: any) {
        this.recipeSchema = product;
    }

    public getRecipe() {
        return this.recipeSchema;
    }

    public async search(ids: any, strategy: string) {
        return this.getSchema().find({
            products_id: strategy === 'contains' ? {$in: ids} : {$eq: ids},
        }).lean();
    }
}
