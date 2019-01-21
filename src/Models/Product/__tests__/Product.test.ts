import ProductService from "../ProductService";
import * as mongoose from "mongoose";
import Settings from "../../../Base/Settings";
import ProductSchema from "../ProductSchema";

const product_service = new ProductService();
const collection = 'product_test';

describe('Product', () => {
    beforeAll(async () => {
        await mongoose.connect(Settings.get().MONGO_URL);

        // Change the name of the schema for testing.
        product_service.setProduct(mongoose.model("Product", ProductSchema, collection));
    });

    test("Testing creation",async () => {
        expect(await product_service.getAll()).toEqual([]);
        const entry = await product_service.create({name: 'Foo'});
        let entries = await product_service.getAll();

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
