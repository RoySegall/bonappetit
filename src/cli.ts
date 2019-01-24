import * as commander from "commander";
import ImporterCommand from "./Console/ImporterCommand";
import * as mongoose from "mongoose";
import Settings from "./Base/Settings";

commander
    .command("migrate-list")
    .description("Get list of importers")
    .action(() => {
        (new ImporterCommand()).getList();
    });

commander
    .command('migrate <importer>')
    .description('Importing stuff. Pass "all" for all the items or the machine name.')
    .action((importer) => {
        (new ImporterCommand()).importItems(importer);
    });

mongoose.connect(Settings.get().MONGO_URL).then(async () => {
    commander.parse(process.argv);
    await mongoose.disconnect();

}).catch((error) => {
    console.error(error);
});
