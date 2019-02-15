import axios from "axios";

export default class Http {

    request(method: string, endpoint: string) {
        return axios({
            method: method,
            url: process.env.BACKEND + '/' + endpoint,
        });
    }

}
