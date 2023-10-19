import axios from "axios";

class RentService {
  getFilter() {
    return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=rent-filter').then(res => res.data)
  }
  getCars(id: string) {
    return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=rent-cars&page=${id}`).then(res => res.data)
  }
}

export default new RentService()