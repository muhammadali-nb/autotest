import axios from "axios";

interface filterProps {
    balance: string[],
    operation: string[],
    car: string[],
    deduction: string[]
}

class TransactionsService {
    getTransactions(page: number, filters: filterProps) {
        return axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=transactions`, { withCredentials: true }).then(res => res.data)
    }
}

export default new TransactionsService();