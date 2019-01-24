import ProductService from "../Models/Product/ProductService";
import RecipeService from "../Models/Recipe/RecipeService";
import ImportBase from "./ImportBase";

export default class RecipesImporter extends ImportBase {

    protected name = "Import recipes";
    protected description = "Import the recipes";

    protected RecipeService: any;
    protected ProductService: any;

    constructor() {
        super();

        this.RecipeService = new RecipeService();
        this.ProductService = new ProductService();

        this.collectionName = this.RecipeService.getSchema().collection.name;
    }

    public async importData() {
        const allProducts: any = (await this.ProductService.getAll());

        const map = {};

        for (let i = 0; i < Object.keys(allProducts).length; i++) {
            map[allProducts[i].name] = allProducts[i]._id;
        }

        return new Promise(async (resolve, reject) => {

            console.log(this.chalk().yellow("Starting to import recipes"));

            const recipes = JSON.parse(this.getAsset("recipes.json"));

            for (let i = 0; i < recipes.length; i++) {

                const ingredients = recipes[i].ingredients;

                for (let j = 0; j < ingredients.length; j++) {
                    recipes[i].ingredients[j].product_id = map[ingredients[j].product_id];
                }
            }

            this.RecipeService.getSchema().collection.insertMany(recipes);

            console.log(this.chalk().yellow("Done! all recipes have been imported"));
            resolve();
        });
    }
}
