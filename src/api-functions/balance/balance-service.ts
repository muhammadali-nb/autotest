import axios from "axios";

class BalanceService {
    getBalance() {
        return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=balance', { withCredentials: true }).then(res => res.data)
    }
}

export default new BalanceService();