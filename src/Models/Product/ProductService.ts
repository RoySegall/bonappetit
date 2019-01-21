import * as mongoose from "mongoose";
import ProductSchema from "./ProductSchema";

export default class ProductService implements EntityService {

    protected productSchema: any;

    constructor() {
        this.productSchema = mongoose.model("Product", ProductSchema);
    }

    public setProduct(product: any) {
        this.productSchema = product;
    }

    public getProduct() {
        return this.productSchema;
    }

    public async getAll() {
        return await this.productSchema.find({}).lean();
    }

    public async load(id: string) {
        return this.productSchema.findById(id).lean();
    }

    public update(id: string, values: any, callback: any) {
        return this.productSchema.findOneAndUpdate({_id: id}, values, {new: true}, callback);
    }

    public async create(object: object) {
        const product = new this.productSchema(object);

        return await product.save();
    }

    public async delete(id: string) {
        const loadedProduct = await this.productSchema.findById(id);

        if (!loadedProduct) {
            return new Promise((resolve, reject) => {
                reject("item_not_exists");
            });
        }

        return await this.productSchema.deleteOne({_id: id});
    }

}
