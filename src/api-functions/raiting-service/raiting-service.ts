import axios from "axios";

export default class RaitingService {
    static getRaitingUsers() {
        return axios.get("https://taxivoshod.ru/api/voshod-auto/?w=rating-order", { withCredentials: true }).then(res => res.data);
    }
}