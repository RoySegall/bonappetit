import * as mongoose from "mongoose";
import Settings from "../../../Base/Settings";
import RecipeService from "../RecipeService";
import RecipeSchema from "../RecipeSchema";

const recipeService = new RecipeService();
const collection = "recipe_test";

describe("Recipe service", () => {

    beforeAll(async () => {
        // Connecting to the db.
        await mongoose.connect(Settings.get().MONGO_URL);

        // Change the name of the schema for testing.
        recipeService.setRecipe(mongoose.model("Recipe", RecipeSchema, collection));
    });

    test("Testing crud operations", async () => {
        expect.assertions(5);

        // Verify we got nothing.
        expect(await recipeService.getAll()).toEqual([]);

        // Creating and verify loading.
        const entry = await recipeService.create({
            name: "Foo"
        });
        // const entries = await recipeService.getAll();
        //
        // expect(entries[0]._id).toEqual(entry._id);
        //
        // let loadedEntry = await recipeService.load(entry._id);
        //
        // expect(loadedEntry._id).toEqual(loadedEntry._id);
        //
        // // Updating a product.
        // recipeService.update(entry._id, {name: "pizza"}, (err, product) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //
        //     expect(product.name).toEqual("pizza");
        // });
        //
        // // Deleting a product.
        // await recipeService.delete(entry._id);
        // loadedEntry = await recipeService.load(entry._id);
        //
        // expect(loadedEntry).toBeNull();
    });

    afterEach(async () => {
        // Truncate the items. Don't need it for now since there's only one test but keep it for future use.
        mongoose.connection.db.collection(collection).deleteMany({});
    });

    afterAll(async (done) => {
        try {
            // Removing the collection we created and closing the connection to the DB.
            await mongoose.connection.db.dropCollection(collection);
            mongoose.disconnect(done);
        } catch (e) {
            console.error(e);
        }
    });

});
