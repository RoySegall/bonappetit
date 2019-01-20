import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    single_peace: {
        type: Boolean,
        default: false,
    },
});

export default ProductSchema;
