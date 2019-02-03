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
        // Pull all the products at once from the DB.
        const allProducts: any = (await this.ProductService.getAll());

        const map = {};

        // Map the items to a name: id object
        for (let i = 0; i < Object.keys(allProducts).length; i++) {
            map[allProducts[i].name] = allProducts[i]._id;
        }

        return new Promise(async (resolve, reject) => {

            console.log(this.chalk().yellow("Starting to import recipes"));

            const recipes = JSON.parse(this.getAsset("recipes.json"));

            for (const recipe of recipes) {
                for (const ingredient of recipe.ingredients) {
                    // Replace the name of the product with the ID.
                    ingredient.product_id = map[ingredient.product_id];
                }
            }

            // Insert them at once to the collection.
            this.RecipeService.getSchema().collection.insertMany(recipes);

            console.log(this.chalk().yellow("Done! all recipes have been imported"));
            resolve();
        });
    }
}