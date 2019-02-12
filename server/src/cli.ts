import * as commander from "commander";
import * as mongoose from "mongoose";
import Settings from "./Base/Settings";
import ImporterCommand from "./Console/ImporterCommand";

commander
    .command("migrate-list")
    .description("Get list of importers")
    .action(() => {
        (new ImporterCommand()).getList();
    });

commander
    .command("migrate <importer>")
    .description('Importing stuff. Pass "all" for all the items or the machine name.')
    .action(async (importer) => {
        await mongoose.connect(Settings.get().MONGO_URL);
        (new ImporterCommand()).importItems(importer).then(() => {
            setTimeout(() => {mongoose.disconnect()}, 2000);
            // mongoose.disconnect();
        });
    });

commander.parse(process.argv);
