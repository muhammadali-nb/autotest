import axios from "axios";
import { Filter } from "../../store/reducers/filterSlice";

class RentService {
  getFilter() {
    return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=rent-filter').then(res => res.data)
  }
  getCars(id: string, filter: Filter) {
    const { year, brands, models, price } = filter
    if (!id) {
      return
    }
    return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=rent-cars&page=${id}` +
      `${year.from && year.to ? `&year[]=${year.from}&year[]=${year.to}` : ""}` +
      `${price.from && price.to ? `&price[]=${price.from}&price[]=${price.to}` : ""}` +
      `${brands.length > 0 ? "&brands[]=" + brands.join("&brands[]=") : ''}` +
      `${models.length > 0 ? "&models[]=" + models.join("&models[]=") : ''}`
    )
      .then(res => res.data)
  }
  getOneCar(id?: string| number) {
    if (!id) {
      return
    }
    return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=rent-car&id=${id}`).then(res => res.data)
  }
}

export default new RentService()