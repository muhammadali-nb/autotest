import axios from "axios";

class FinesService {
    getFines(page: number) {
        return axios.get(`/voshod-auto/?w=fines&page=${page}`, { withCredentials: true }).then(res => res.data)
    }
}

export default new FinesService();