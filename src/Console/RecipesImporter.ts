import ImportBase from "./ImportBase";
import * as mongoose from "mongoose";
import ProductService from "../Models/Product/ProductService";
import RecipeService from "../Models/Recipe/RecipeService";

export default class RecipesImporter extends ImportBase {

    protected name = "Import recipes";
    protected description = "Import the recipes";

    constructor() {
        super();

        this.collectionName = new RecipeService().getSchema().collection.name;
    }

    public async importData() {
        return new Promise(async (resolve, reject) => {

            console.log(this.chalk().yellow("Starting to import recipes"));

            const recipes = JSON.parse(this.getAsset('recipes.json'));
            const ps = new ProductService();

            const foo = await ps.loadByName('Butter');

            console.log(this.chalk().yellow("Done! all recipes have been imported"));
            recipes.forEach((recipe) => {

                // recipe.ingredients.forEach(async (ingredient) => {
                //     try {
                //         ingredient.product_id = await ps.loadByName('Butter');
                //     } catch (error) {
                //         console.error(error);
                //     }
                // });
            });

            // console.log(recipes);
            resolve();
            //
        });
    }
}
