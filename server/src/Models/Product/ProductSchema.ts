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
    diet: {
        type: [String],
        required: true,
    },
});

export default ProductSchema;
