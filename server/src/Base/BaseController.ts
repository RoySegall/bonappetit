import * as express from "express";

export default abstract class BaseController {

    /**
     * Setting up an error.
     *
     * @param res
     *  The express response object.
     * @param message
     *  The message.
     * @param error
     *  The error code. Default to 400.
     */
    public static generalError(
        res: express.Response,
        message: object = {error: "It's seems there was an error"},
        error: number = 400) {
        res.status(error).send(message);
    }

    /**
     * Go over mongoose erros and process them,
     *
     * @param errors
     *  The errors object.
     */
    public static handleMongooseError(errors: object): object {
        try {
            const returnErrors = {};

            Object.keys(errors).forEach((item) => {
                returnErrors[errors[item].path] = errors[item].message;
            });

            return returnErrors;
        } catch (e) {
            console.error(errors);
            return {error: "There was an error we could not catch. Try again later."};
        }
    }

    /**
     * Express router.
     */
    public router: express.Router = express.Router();

    /**
     * Constructor for the class.
     */
    constructor() {
        this.routes();
    }

    /**
     * Initialize the routes of the controller.
     */
    public abstract routes();

}
