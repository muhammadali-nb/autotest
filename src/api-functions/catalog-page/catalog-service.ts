import axios from "axios";
import { CatalogFilter } from "../../store/reducers/catalogFilterSlice";

class CatalogService {
  getFilter() {
    return axios.get('https://taxivoshod.ru/api/voshod-auto/?w=catalog-filter', { withCredentials: true }).then(res => res.data)
  }
  getCars(id: string | number, filter: CatalogFilter) {
    const { year, brands, models, price, tags, condition } = filter
    if (!id) {
      return
    }
    return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=catalog-cars&page=${id}` +
      `${year.from && year.to ? `&year[]=${year.from}&year[]=${year.to}` : ""}` +
      `${price.from && price.to ? `&price[]=${price.from}&price[]=${price.to}` : ""}` +
      `${brands.length > 0 ? "&brands[]=" + brands.join("&brands[]=") : ''}` +
      `${models.length > 0 ? "&models[]=" + models.join("&models[]=") : ''}` +
      `${condition ? '&new[]=' + condition : ''}` +
      `${tags ? "&tags[]=" + tags : ""}`,
      { withCredentials: true }
    )
      .then(res => res.data)
  }
  getOneCar(id?: string) {
    if (!id) {
      return
    }
    return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=catalog-car&id=${id}`, { withCredentials: true }).then(res => res.data)
  }
}

export default new CatalogService()