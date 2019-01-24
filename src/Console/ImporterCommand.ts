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

    public async importItems(item: string) {

        let importers;

        if (item === "all") {
            importers = Object.keys(this.importers);
        } else {
            importers = Object.keys(this.importers).filter((key) => {
                return key === item;
            });
        }

        return Promise.all(importers.map(async (key) => {
            this.importers[key].clear();
            await this.importers[key].importData();
        }));
    }

}
