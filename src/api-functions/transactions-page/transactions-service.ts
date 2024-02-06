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
        let deductions = '';

        if (filters.balance.length) {
            filters.balance.map(item => {
                vendor += `&vendor[]=${item}`;
            });
        }

        if (filters.operation.length) {
            filters.operation.map(item => {
                type += `&type[]=${item}`;
            });
        }

        if (filters.car.length) {
            filters.car.map(item => {
                cars += `&car_id[]=${item}`;
            });
        }

        if (filters.deduction.length) {
            filters.deduction.map(item => {
                deductions += `&deduction_id[]=${item}`;
            });
        }

        return axios.get(`/voshod-auto/?w=transactions&page=${page}` +
            vendor +
            type +
            cars +
            deductions, { withCredentials: true }).then(res => res.data)
    }
}

export default new TransactionsService();