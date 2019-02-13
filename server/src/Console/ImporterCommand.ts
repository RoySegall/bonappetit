import ProductsImporter from "./ProductsImporter";
import RecipesImporter from "./RecipesImporter";
import * as mongoose from "mongoose";

export default class ImporterCommand {

    /**
     * List of importers.
     */
    protected importers: any;

    constructor() {
        this.importers = {
            products: new ProductsImporter(),
            recipes: new RecipesImporter(),
        };
    }

    /**
     * Get list of importers.
     */
    public getList() {
        const chalk = require("chalk");

        (Object.keys(this.importers).map((item) => {
            const [name, machineName, description] = [
                chalk.blue(this.importers[item].getName()),
                chalk.yellow(item),
                chalk.green(this.importers[item].getDescription()),
            ];

            console.log(`${name}(${machineName}): ${description}`);
        }));
    }

    /**
     * Import items in from a collection of migration file.
     *
     * @param item
     */
    public async importItems(item: string) {
        this.importers[item].clearCollection();
        this.importers[item].importData();
    }
}
