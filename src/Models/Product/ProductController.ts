import BaseController from "../../Base/BaseController";
import ProductSchema from "./ProductSchema";
import * as express from "express";
import * as mongoose from 'mongoose';

const Product = mongoose.model('Product', ProductSchema);

export default class ProductController extends BaseController {

    public routes() {
        this.router.get("/products", async(req: express.Request, res: express.Response) => {
            try {
                const products = await Product.find({}).lean();
                res.status(200).send(products);
            } catch (e) {
                BaseController.generalError(res);
                console.error(e);
            }
        });

        this.router.get("/product/:id", async(req: express.Request, res: express.Response) => {
            const loadedProduct = await Product.findById(req.params.id);

            if (!loadedProduct) {
                res
                    .status(404)
                    .send({message: "The item does no exists"});
                return;
            }

            res.status(200).send(loadedProduct);
        });

        this.router.patch("/product/:id", async(req: express.Request, res: express.Response) => {
            Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, product) => {
                if (err) {
                    BaseController.generalError(res, BaseController.handleMongooseError(err));
                    return;
                }

                res.status(203).send(product);
            });
        });

        this.router.post("/product", async(req: express.Request, res: express.Response) => {
            let product = new Product(req.body);

            try {
                let results = await product.save();
                res.status(201).send(results);
            } catch (e) {
                BaseController.generalError(res, BaseController.handleMongooseError(e.errors));
            }
        });

        this.router.delete("/product/:id", async(req: express.Request, res: express.Response) => {
            try {
                const loadedProduct = await Product.findById(req.params.id);

                if (!loadedProduct) {
                    res
                        .status(404)
                        .send({message: "The item does no exists"});
                    return;
                }

                await Product.deleteOne({_id: req.params.id});

                res
                    .status(200)
                    .send({message: "Removed"});
            } catch (e) {
                BaseController.generalError(res, BaseController.handleMongooseError(e.errors));
            }
        });
    }
}
