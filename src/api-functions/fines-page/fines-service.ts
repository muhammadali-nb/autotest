import axios from "axios";

class FinesService {
    getFines() {
        return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=fines', { withCredentials: true }).then(res => res.data)
    }
}

export default new FinesService();