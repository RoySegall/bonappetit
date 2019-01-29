import * as mongoose from "mongoose";
import ProductsImporter from "./ProductsImporter";
import RecipesImporter from "./RecipesImporter";

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

        let importers;

        if (item === "all") {
            // We decided to import all the items.
            importers = Object.keys(this.importers);
        } else {
            // Filter the items collection we don't want to import.
            importers = Object.keys(this.importers).filter((key) => {
                return key === item;
            });
        }

        // Go over the mappers and run the import method.
        return Promise.all(importers.map(async (key) => {
            this.importers[key].clearCollection();
            await this.importers[key].importData();
        }));
    }

}
