export default class Settings {

    public static get() {
        return require("dotenv").config().parsed;
    }
}
