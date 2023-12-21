import axios from "axios";


class RentHistoryService {
  getCars() {
    return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=history-rent', { withCredentials: true }).then(res => res.data)
  }
}

export default new RentHistoryService()