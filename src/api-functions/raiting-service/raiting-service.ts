import axios from "axios";
import api from "../../core/axios";

export default class RaitingService {
    static getRaitingUsers(date: string) {
        return api.get(`/voshod-auto/?w=rating-order&date=${date}`, { withCredentials: true }).then(res => res.data);
    }
}