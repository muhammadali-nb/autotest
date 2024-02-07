import axios from "axios";


class RentHistoryService {
  getCars() {
    return axios.get('/voshod-auto/?w=history-rent', { withCredentials: true }).then(res => res.data)
  }
}

export default new RentHistoryService()