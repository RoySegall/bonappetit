import axios from "axios";

export default class Http {

    request(method: string, endpoint: string, data: object = {}) {
        return axios({
            method: method,
            url: process.env.BACKEND + '/' + endpoint,
            data,
        });
    }

}
