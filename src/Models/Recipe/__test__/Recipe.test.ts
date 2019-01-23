import * as mongoose from "mongoose";
import Settings from "../../../Base/Settings";
import RecipeService from "../RecipeService";
import RecipeSchema from "../RecipeSchema";
import ProductService from "../../Product/ProductService";
import ProductSchema from "../../Product/ProductSchema";

const recipeService = new RecipeService();
const productService = new ProductService();

const recipeCollection = "recipe_test";
const productCollection = "product_test";

const products: any = {};

describe("Recipe service", () => {

    beforeAll(async () => {
        // Connecting to the db.
        await mongoose.connect(Settings.get().MONGO_URL);

        // Change the name of the schema for testing.
        recipeService.setRecipe(mongoose.model("Recipe", RecipeSchema, recipeCollection));
        productService.setProduct(mongoose.model("Product", ProductSchema, productCollection));

        products.egg = await productService.create({name: 'Egg'});
        products.butter = await productService.create({name: 'Butter'});
        products.salt = await productService.create({name: 'Salt'});
    });

    test("Testing crud operations", async () => {
        expect.assertions(5);

        // Verify we got nothing.
        expect(await recipeService.getAll()).toEqual([]);

        // Creating and verify loading.
        const entry = await recipeService.create({
            name: "Omelette",
            description: "Making a simple omelette",
            ingredients: [
                {
                    product_id: products.egg._id,
                    amount: 2,
                    quantity: 'pieces',
                },
                {
                    product_id: products.butter._id,
                    amount: 5,
                    quantity: 'gram',
                },
                {
                    product_id: products.salt._id,
                    amount: 1,
                    quantity: 'tbs',
                },
            ],
            steps: [
                {text: 'Take a pan and hit it'},
                {text: 'Crack two eggs into a bowel'},
                {text: 'Add the salt'},
                {text: 'scramble them together'},
                {text: 'Once the pan is hot, poor the scramble eggs to the pan'},
                {text: 'Wait until the scramble eggs solid on the back side and flip it'},
                {text: 'Repeat again on the previous step'}
            ],
        });

        const entries = await recipeService.getAll();

        expect(entries[0]._id).toEqual(entry._id);

        let loadedEntry = await recipeService.load(entry._id);

        expect(loadedEntry._id).toEqual(loadedEntry._id);

        // Updating a product.
        recipeService.update(entry._id, {name: "pizza"}, (err, product) => {
            if (err) {
                console.error(err);
                return;
            }

            expect(product.name).toEqual("pizza");
        });

        // Deleting a product.
        await recipeService.delete(entry._id);
        loadedEntry = await recipeService.load(entry._id);

        expect(loadedEntry).toBeNull();
    });

    afterEach(async () => {
        // Truncate the items. Don't need it for now since there's only one test but keep it for future use.
        mongoose.connection.db.collection(recipeCollection).deleteMany({});
        mongoose.connection.db.collection(productCollection).deleteMany({});
    });

    afterAll(async (done) => {
        try {
            // Removing the recipeCollection we created and closing the connection to the DB.
            await mongoose.connection.db.dropCollection(recipeCollection);
            await mongoose.connection.db.dropCollection(productCollection);
            
            mongoose.disconnect(done);
        } catch (e) {
            console.error(e);
        }
    });

});
