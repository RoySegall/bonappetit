import * as moment from "moment";
import * as mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    created: {
        type: Number,
    },
    matchFor: {
        type: [String],
        required: true,
        validate: {
            validator(v) {
                return v.length > 0;
            },
            message: (props) => `${props.value} is empty`,
        },
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
    steps: [{
        text: {
            type: String,
            required: true,
        },
        time_to_next_step: Number,
    }],
    notes: [{
        text: {
            type: String,
        },
    }],
});

RecipeSchema.pre("validate", function(this: any, next) {
    const recipe = this;
    // Yes, validate function need to handle only validation but if we won't change the value of the date to timestamp
    // mongoose will kick us out.
    recipe.created = moment(recipe.created).unix();
    next();
});

export default RecipeSchema;
