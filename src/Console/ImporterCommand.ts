import ProductsImporter from "./ProductsImporter";
import RecipesImporter from "./RecipesImporter";
import * as inquirer from "inquirer";


export default class ImporterCommand {

    /**
     * List of importers.
     */
    protected importers: any;

    constructor() {
        this.importers = {
            'items': new ProductsImporter(),
            'recipes': new RecipesImporter(),
        };
    }

    getList() {
        const questions = [
            {
                type: "list",
                name: "EXTENSION",
                message: "What is the file extension?",
                choices: Object.keys(this.importers) + ["a", "a"],
                filter: function(val) {
                    return val.split(".")[1];
                }
            }
        ];
        return inquirer.prompt(questions);
    }

}
