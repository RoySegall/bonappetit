import * as commander from "commander"
import ImporterCommand from "./Console/ImporterCommand";
const chalk = require('chalk');
import * as figlet from "figlet";

const init = () => {
    console.log(
        chalk.blueBright(
            figlet.textSync("Awesome CLI", {
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

commander
    .command('migrate-list')
    .description('Get list of importers')
    .action(function () {
        (new ImporterCommand).getList();
    });

init();
commander.parse(process.argv);
