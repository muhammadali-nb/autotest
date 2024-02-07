import api from "../../core/axios";

export default class RaitingService {
    static getRaitingUsers(date?: string) {

        const url = date 
            ? `/voshod-auto/?w=rating-order&date=${date}`
            : "/voshod-auto/?w=rating-order"

        return api.get(url, { withCredentials: true }).then(res => res.data);
    }
}