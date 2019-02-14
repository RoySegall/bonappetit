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
        validate: {
            validator(v) {
                return v.length > 0;
            },
            message: (props) => `${props.value} is empty`,
        },
    },
});

export default ProductSchema;
