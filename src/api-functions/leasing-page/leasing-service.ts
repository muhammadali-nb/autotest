import api from "../../core/axios"

class LeasingService {
  getLeasingCars() {
    return api.get('/voshod-auto/?w=car-leasing', { withCredentials: true }).then(res => res.data)
  }
}

export default new LeasingService()