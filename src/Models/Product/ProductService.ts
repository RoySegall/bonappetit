import * as mongoose from "mongoose";
import AbstractEntityService from "../../Base/AbstractEntityService";
import EntityService from "../../Base/AbstractEntityService";
import ProductSchema from "./ProductSchema";

export default class ProductService extends AbstractEntityService implements EntityService {

    protected productSchema: any;

    constructor() {
        super();

        this.productSchema = mongoose.model("Product", ProductSchema);
    }

    public getSchema() {
        return this.getProduct();
    }

    public setProduct(product: any) {
        this.productSchema = product;
    }

    public getProduct() {
        return this.productSchema;
    }

    public async loadByName(name: string) {
        return this.getSchema().findOne({name: name});
    }

}
