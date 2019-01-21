import * as mongoose from "mongoose";
import Settings from "../../../Base/Settings";
import ProductSchema from "../ProductSchema";
import ProductService from "../ProductService";

const productService = new ProductService();
const collection = "product_test";

describe("Product", () => {
    beforeAll(async () => {
        await mongoose.connect(Settings.get().MONGO_URL);

        // Change the name of the schema for testing.
        productService.setProduct(mongoose.model("Product", ProductSchema, collection));
    });

    test("Testing creation", async () => {
        expect(await productService.getAll()).toEqual([]);
        const entry = await productService.create({name: "Foo"});
        const entries = await productService.getAll();

        expect(entries[0]._id).toEqual(entry._id);
    });

    afterEach(async () => {
        mongoose.connection.db.collection(collection).deleteMany({});
    });

    afterAll(async (done) => {
        try {
            await mongoose.connection.db.dropCollection(collection);
            mongoose.disconnect(done);
        } catch (e) {
            console.error(e);
        }
    });

});
