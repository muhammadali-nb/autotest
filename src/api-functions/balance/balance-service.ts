import axios from "axios";
import api from "../../core/axios";

class BalanceService {
    getBalance() {
        return api.get('/voshod-auto/?w=balance', { withCredentials: true }).then(res => res.data)
    }
}

export default new BalanceService();