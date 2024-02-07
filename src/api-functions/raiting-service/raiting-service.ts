import axios from "axios";

export default class RaitingService {
    static getRaitingUsers(date?: string) {

        const url = date 
            ? `https://taxivoshod.ru/api/voshod-auto/?w=rating-order&date=${date}`
            : "https://taxivoshod.ru/api/voshod-auto/?w=rating-order"

        return axios.get(url, { withCredentials: true }).then(res => res.data);
    }
}