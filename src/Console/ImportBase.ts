import * as fs from "fs";
import * as mongoose from "mongoose";
import * as path from "path";

export default abstract class ImportBase {

    protected name;
    protected description;
    protected collectionName;

    public getName() {
        return this.name;
    }

    public getDescription() {
        return this.description;
    }

    public abstract importData();

    public clear() {
        console.log(this.chalk().yellow(`Cleaning ${this.collectionName}`));

        mongoose.connection.db.collection(this.collectionName).deleteMany({});

        console.log(this.chalk().green("Cleaned!"));
    }

    protected chalk() {
        return require("chalk");
    }

    protected getAsset(name: string) {
        return fs.readFileSync(path.join(__dirname, "assets", name)).toString();
    }

}
