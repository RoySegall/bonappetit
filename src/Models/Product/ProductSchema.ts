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
    single_peace: {
        default: false,
        type: Boolean,
    },
});

export default ProductSchema;
