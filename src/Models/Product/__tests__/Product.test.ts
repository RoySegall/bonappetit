import * as mongoose from "mongoose";
import Settings from "../../../Base/Settings";
import ProductSchema from "../ProductSchema";
import ProductService from "../ProductService";

const productService = new ProductService();
const collection = "product_test";

describe("Product service", () => {

    beforeAll(async () => {
        // Connecting to the db.
        await mongoose.connect(Settings.get().MONGO_URL);

        // Change the name of the schema for testing.
        productService.setProduct(mongoose.model("Product", ProductSchema, collection));
    });

    test("Testing crud operations", async () => {
        expect.assertions(5);

        // Verify we got nothing.
        expect(await productService.getAll()).toEqual([]);

        // Creating and verify loading.
        const entry = await productService.create({name: "Foo"});
        const entries = await productService.getAll();

        expect(entries[0]._id).toEqual(entry._id);

        let loadedEntry = await productService.load(entry._id);

        expect(loadedEntry._id).toEqual(loadedEntry._id);

        // Updating a product.
        productService.update(entry._id, {name: "pizza"}, (err, product) => {
            if (err) {
                console.error(err);
                return;
            }

            expect(product.name).toEqual("pizza");
        });

        // Deleting a product.
        await productService.delete(entry._id);
        loadedEntry = await productService.load(entry._id);

        expect(loadedEntry).toBeNull();
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
