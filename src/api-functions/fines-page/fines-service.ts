
import api from "../../core/axios";

class FinesService {
    getFines(page: number) {
        return api.get(`/voshod-auto/?w=fines&page=${page}`, { withCredentials: true }).then(res => res.data)
    }
}

export default new FinesService();