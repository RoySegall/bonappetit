import * as mongoose from "mongoose";
import Settings from "../../../Base/Settings";
import ProductSchema from "../../Product/ProductSchema";
import ProductService from "../../Product/ProductService";
import RecipeSchema from "../RecipeSchema";
import RecipeService from "../RecipeService";

const recipeService = new RecipeService();
const productService = new ProductService();

const recipeCollection = "recipe_test" + (new Date()).getTime();
const productCollection = "product_test" + (new Date()).getTime();

const products: any = {};

describe("Recipe service", () => {

    const createRecipe = async () => {
        return await recipeService.create({
            title: "Omelette",
            description: "Making a simple omelette",
            matchFor: ["Vegetarian", "Carnivore"],
            created: "June 25 2018",
            ingredients: [
                {
                    product_id: products.egg._id,
                    amount: 2,
                    quantity: "pieces",
                },
                {
                    product_id: products.butter._id,
                    amount: 5,
                    quantity: "gram",
                },
                {
                    product_id: products.salt._id,
                    amount: 1,
                    quantity: "tbs",
                },
            ],
            steps: [
                {
                    text: "Take a pan and hit it",
                },
                {
                    text: "Crack two eggs into a bowel",
                },
                {
                    text: "Add the salt",
                },
                {
                    text: "scramble them together",
                },
                {
                    text: "Once the pan is hot, poor the scramble eggs to the pan",
                },
                {
                    text: "Wait until the scramble eggs solid on the back side and flip it",
                },
                {
                    text: "Repeat again on the previous step",
                },
            ],
            notes: [
                {
                    text: "You can switch the butter with oil",
                },
                {
                    text: "You might want to use a non-stick pan which can reduce the amount of oil",
                },
                {
                    text: "Eggs can be a good source for protein",
                },
            ],
        });
    };

    beforeAll(async () => {
        // Connecting to the db.
        await mongoose.connect(Settings.get().MONGO_URL);

        // Change the name of the schema for testing.
        recipeService.setRecipe(mongoose.model("Recipe", RecipeSchema, recipeCollection));
        productService.setProduct(mongoose.model("Product", ProductSchema, productCollection));

        products.egg = await productService.create({name: "Egg", diets: ["carnivore", "vegetarian"]});
        products.butter = await productService.create({name: "Butter", diets: ["carnivore", "vegetarian"]});
        products.salt = await productService.create({name: "Salt", diets: ["carnivore", "vegetarian"]});
    });

    test("Testing crud operations", async () => {
        expect.assertions(5);

        // Verify we got nothing.
        expect(await recipeService.getAll()).toEqual([]);

        // Creating and verify loading.
        const entry = createRecipe();

        const entries = await recipeService.getAll();

        expect(entries[0]._id).toEqual(entry._id);

        let loadedEntry = await recipeService.load(entry._id);

        expect(loadedEntry._id).toEqual(loadedEntry._id);

        // Updating a product.
        recipeService.update(entry._id, {title: "pizza"}, (err, product) => {
            if (err) {
                console.error(err);
                return;
            }

            expect(product.title).toEqual("pizza");
        });

        // Deleting a product.
        await recipeService.delete(entry._id);
        loadedEntry = await recipeService.load(entry._id);

        expect(loadedEntry).toBeNull();
    });

    test("Testing the product ids entries", async () => {
        const entry = await createRecipe();

        expect.assertions(2);

        expect(entry.products_id).not.toBe([]);
        expect(entry.products_id).toHaveLength(3);
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
