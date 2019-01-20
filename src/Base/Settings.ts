export default class Settings {
    static get() {
        return require('dotenv').config().parsed
    }
}
