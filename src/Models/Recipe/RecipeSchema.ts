import * as mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    ingredients: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        quantity: {
            type: String,
            required: true,
        },
    }],
    video: String,
    steps: [{
        text: {
            type: String,
            required: true,
        },
        time_to_next_step: Number,
    }],
});

export default RecipeSchema;
