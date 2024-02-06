import axios from "axios";

class BalanceService {
    getBalance() {
        return axios.get('/voshod-auto/?w=balance', { withCredentials: true }).then(res => res.data)
    }
}

export default new BalanceService();