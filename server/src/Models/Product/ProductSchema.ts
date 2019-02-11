import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    image: {
        default: "",
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    diets: {
        type: [String],
        required: true,
    },
});

export default ProductSchema;
