import * as mongoose from "mongoose";

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

    protected chalk() {
        return require("chalk");
    }

    public abstract importData();

    public clear() {
        console.log(this.chalk().yellow(`Cleaning ${this.collectionName}`));

        mongoose.connection.db.collection(this.collectionName).deleteMany({});

        console.log(this.chalk().green("Cleaned!"))
    }

}
