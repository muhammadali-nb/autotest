import axios from "axios";

interface filterProps {
    balance: string[],
    operation: string[],
    car: string[],
    deduction: string[]
}

class TransactionsService {
    getTransactions(page: number, filters: filterProps) {
        let vendor = '';
        let type = '';
        let cars = '';

        if (filters.balance.length) {
            filters.balance.map(item => {
                vendor += `&vendor[]=${item}`;
            });
        }

        if (filters.operation.length) {
            filters.operation.map(item => {
                type += `&type[]=${item}`
            });
        }

        if (filters.car.length) {
            filters.car.map(item => {
                cars += `&car_id[]=${item}`
            });
        }

        return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=transactions&page=${page}` + 
        vendor +
        type +
        cars, { withCredentials: true }).then(res => res.data)
    }
}

export default new TransactionsService();