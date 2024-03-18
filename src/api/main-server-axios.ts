import axios from "axios";

module.exports = axios.create({
    baseURL : process.env.APP_SERVER_URL + "/integration",
});