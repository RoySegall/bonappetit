import app from "./app";
import * as mongoose from "mongoose";
import Settings from "./Base/Settings";

mongoose.connect(Settings.get().MONGO_URL)
    .then(() => {
        app.listen(Settings.get().PORT, () => {
            console.log("Express server listening on port " + Settings.get().PORT);
        });
    })
    .catch((error) => {
        console.error(error);
    });

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('Disconnecting');
    process.exit();
});
