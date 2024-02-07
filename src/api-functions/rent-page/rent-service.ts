
import { Filter } from "../../store/reducers/filterSlice";
import api from "../../core/axios";

class RentService {
  getFilter() {
    return api.get('/voshod-auto/?w=filter-rent').then(res => res.data)
  }
  getCars(id: number, filter: Filter) {
    const { year, brands, models, price, special, tarif } = filter
    if (!id) {
      return
    }
    return api.get(`/voshod-auto/?w=cars-rent&page=${id}` +
      `${year.from && year.to ? `&year[]=${year.from}&year[]=${year.to}` : ""}` +
      `${price.from && price.to ? `&price[]=${price.from}&price[]=${price.to}` : ""}` +
      `${brands.length > 0 ? "&brands[]=" + brands.join("&brands[]=") : ''}` +
      `${models.length > 0 ? "&models[]=" + models.join("&models[]=") : ''}` +
      `${special ? "&free[]=" + special : ""}` +
      `${tarif ? "&tarif[]=" + tarif : ""}`, { withCredentials: true }
    )
      .then(res => res.data)
  }
  getOneCar(id?: string | number) {
    if (!id) {
      return
    }
    return api.get(`/voshod-auto/?w=car-rent&id=${id}`, { withCredentials: true }).then(res => res.data)
  }
}

export default new RentService()