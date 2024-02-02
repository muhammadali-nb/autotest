import axios from "axios";

export default class RaitingService {
    static getRaitingUsers(date: string) {
        return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=rating-order&date=${date}`, { withCredentials: true }).then(res => res.data);
    }
}