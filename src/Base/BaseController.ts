import * as express from "express";

export default abstract class BaseController {

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
    abstract routes();

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
    static generalError(res: express.Response, message: object = {error: "It's seems there was an error"}, error: number = 400) {
        res.status(error).send(message);
    }

    /**
     * Go over mongoose erros and process them,
     *
     * @param errors
     *  The errors object.
     */
    static handleMongooseError(errors: object): object {
        try {
            let returnErrors = {};

            Object.keys(errors).forEach((item) => {
                returnErrors[errors[item].path] = errors[item].message;
            });

            return returnErrors;
        } catch (e) {
            console.error(errors);
            return {error: "There was an error we could not catch. Try again later."};
        }
    }

}
