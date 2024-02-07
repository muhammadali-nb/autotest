import axios from "axios"

class LeasingService {
  getLeasingCars() {
    return axios.get('/voshod-auto/?w=car-leasing', { withCredentials: true }).then(res => res.data)
  }
}

export default new LeasingService()