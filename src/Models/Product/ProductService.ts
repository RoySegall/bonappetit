import * as mongoose from "mongoose";
import ProductSchema from "./ProductSchema";

export default class ProductService {

    protected product: any;

    constructor() {
        this.product = mongoose.model("Product", ProductSchema);
    }

    public async getAll() {
        return await this.product.find({}).lean()
    }

    public async load(id: string) {
        return this.product.findById(id);
    }

    public update(id: string, values: any, callback: any) {
        return this.product.findOneAndUpdate({_id: id}, values, {new: true}, callback);
    }

    public async create(object: object) {
        const product = new this.product(object);

        return await product.save();
    }

    public async delete(id: string) {
        const loadedProduct = await this.product.findById(id);

        if (!loadedProduct) {
            // return new Promise((resolve, reject) => {
            //     reject();
            // });
        }

        return await this.product.deleteOne({_id: id});
    }

}
