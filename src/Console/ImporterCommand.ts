import ProductsImporter from "./ProductsImporter";
import RecipesImporter from "./RecipesImporter";

export default class ImporterCommand {

    /**
     * List of importers.
     */
    protected importers: any;

    constructor() {
        this.importers = {
            items: new ProductsImporter(),
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

}
