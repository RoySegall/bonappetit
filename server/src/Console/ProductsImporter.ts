import * as mongoose from "mongoose";
import ProductService from "../Models/Product/ProductService";
import ImportBase from "./ImportBase";

export default class ProductsImporter extends ImportBase {

    protected name = "Import products";
    protected description = "Import products";
    protected productService;

    constructor() {
        super();

        this.productService = new ProductService();
        this.collectionName = this.productService.getSchema().collection.name;
    }

    public async importData() {
        console.log(this.chalk().yellow("Starting to import products"));

        const items = JSON.parse(this.getAsset("products.json"));

        Promise.all(items.map(async (item) => {
            try {
                await this.productService.create(item);
                console.log(`Migrating ${item.name}`);
            } catch (e) {
                console.error(e);
            }
        }));

        console.log(this.chalk().yellow("Done! all products have been imported"));
    }
}
