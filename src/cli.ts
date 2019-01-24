import * as commander from "commander";
import ImporterCommand from "./Console/ImporterCommand";

commander
    .command("migrate-list")
    .description("Get list of importers")
    .action(() => {
        (new ImporterCommand()).getList();
    });

commander.parse(process.argv);
