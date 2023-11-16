import axios from "axios";
import { Filter } from "../../store/reducers/filterSlice";

class CatalogService {
  getFilter() {
    return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=catalog-filter', { withCredentials: true }).then(res => res.data)
  }
  getCars(id: string | number, filter: Filter) {
    const { year, brands, models, price, special, tarif } = filter
    if (!id) {
      return
    }
    return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=catalog-cars&page=${id}` +
      `${year.from && year.to ? `&year[]=${year.from}&year[]=${year.to}` : ""}` +
      `${price.from && price.to ? `&price[]=${price.from}&price[]=${price.to}` : ""}` +
      `${brands.length > 0 ? "&brands[]=" + brands.join("&brands[]=") : ''}` +
      `${models.length > 0 ? "&models[]=" + models.join("&models[]=") : ''}` +
      `${special ? "&free[]=" + special : ""}` +
      `${tarif ? "&tarif[]=" + tarif : ""}`, { withCredentials: true }
    )
      .then(res => res.data)
  }
}

export default new CatalogService()