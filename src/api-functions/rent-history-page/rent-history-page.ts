import api from "../../core/axios";


class RentHistoryService {
  getCars() {
    return api.get('/voshod-auto/?w=history-rent', { withCredentials: true }).then(res => res.data)
  }
}

export default new RentHistoryService()