import ProductService from "../Models/Product/ProductService";
import RecipeService from "../Models/Recipe/RecipeService";
import ImportBase from "./ImportBase";

export default class RecipesImporter extends ImportBase {

    protected name = "Import recipes";
    protected description = "Import the recipes";

    protected RecipeService: RecipeService;
    protected ProductService: ProductService;

    constructor() {
        super();

        this.RecipeService = new RecipeService();
        this.ProductService = new ProductService();

        this.collectionName = this.RecipeService.getSchema().collection.name;
    }

    public async importData() {
        // Pull all the products at once from the DB.
        const allProducts: any = await (this.ProductService.getAll());

        const map = {};

        // Map the items to a name: id object
        for (let i = 0; i < Object.keys(allProducts).length; i++) {
            map[allProducts[i].name] = allProducts[i]._id;
        }

        console.log(this.chalk().yellow("Starting to import recipes"));

        const recipes = JSON.parse(this.getAsset("recipes.json"));

        recipes.map((recipe) => {
            for (const ingredient of recipe.ingredients) {
                // Replace the name of the product with the ID.
                ingredient.product_id = map[ingredient.product_id];
            }

            console.log(`Migrating ${recipe.title}`)

            this.RecipeService.create(recipe);
        });

        console.log(this.chalk().yellow("Done! all recipes have been imported"));
    }
}
