import ImportBase from "./ImportBase";
import ProductService from "../Models/Product/ProductService";

export default class ProductsImporter extends ImportBase {

    protected name = "Import products";
    protected description = "Import products";

    constructor() {
        super();

        this.collectionName = new ProductService().getSchema().collection.name;
    }

    public importData() {
        console.log(this.chalk().yellow("Starting to import products"));
        console.log(this.chalk().yellow("Done! all products have been imported"));
    }
}
