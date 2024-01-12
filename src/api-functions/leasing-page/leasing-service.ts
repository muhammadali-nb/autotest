import axios from "axios"

class LeasingService {
  getLeasingCars() {
    return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=car-leasing', { withCredentials: true }).then(res => res.data)
  }
}

export default new LeasingService()