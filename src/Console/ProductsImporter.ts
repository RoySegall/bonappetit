import * as mongoose from "mongoose";
import ProductService from "../Models/Product/ProductService";
import ImportBase from "./ImportBase";

export default class ProductsImporter extends ImportBase {

    protected name = "Import products";
    protected description = "Import products";

    constructor() {
        super();

        this.collectionName = new ProductService().getSchema().collection.name;
    }

    public importData() {
        console.log(this.chalk().yellow("Starting to import products"));

        mongoose
            .connection
            .db
            .collection(this.collectionName)
            .insertMany(JSON.parse(this.getAsset("products.json")));

        console.log(this.chalk().yellow("Done! all products have been imported"));
    }
}
