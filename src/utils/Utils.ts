import { RentCreateAccountForm } from '../types/RentTypes';
import { CallRequestData } from "../Api";
import { ConfirmPhone } from '../Api';


let Utils = {

    convertBase64(file) {
        return new Promise((resolve, rejects) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                rejects(error)
            }
        })
    },

    validatePhone(phone: string) {
        return !!phone.replace(/\D+/g, '').match(/[78]\d{10}/)
    },
    validateRentCreateAccont(request: RentCreateAccountForm) {
        let errors = {};
        if (!request.lastName || request.lastName.length < 0)
            errors['lastName'] = "Не указано фамилия";
        if (!request.name || request.name.length < 0)
            errors['name'] = "Не указано имя";
        if (!request.middleName || request.middleName.length < 0)
            errors['middleName'] = "Не указано отчество";
        return errors;
    },
    validateConfirmPhone(request: ConfirmPhone) {
        let errors = {};
        if (!request.phone || request.phone.length < 0)
            errors['phone'] = "Не указан номер телефона";
        if (!request.confirm)
            errors['confirm'] = true;
        return errors;
    },
    validateForm(request: CallRequestData, needComment: string | boolean = false) {
        let errors = {};
        if (!request.name)
            errors['name'] = "Не указано имя";
        // if(!data.lastName)
        //     errors['lastName'] = "Не указано имя";
        if (!request.phone || request.phone === '+7')
            errors['phone'] = "Не указан номер телефона";
        if (!Utils.validatePhone(request.phone))
            errors['phone'] = "Телефон в неверном формате";
        if (!request.confirm)
            errors['confirm'] = true;
        if (needComment && !request.comment)
            errors['comment'] = needComment;
        return errors;
    },
    cleanPhone(phone: string) {
        if (!Utils.validatePhone(phone))
            return '';
        let ph = phone.replace(/\D+/g, '');
        if (ph.startsWith('7'))
            ph = "+" + ph;
        return ph.startsWith('7') ? "+" + ph : ph;
    },

    textFromCount(n: number, words: Array<string>, withNum: boolean = true) {
        if (n >= 5 && n <= 20)
            return (withNum ? (n + " ") : "") + words[2];

        if ([0, 5, 6, 7, 8, 9].includes(n % 10))
            return (withNum ? (n + " ") : "") + words[2];

        if ([1].includes(n % 10))
            return (withNum ? (n + " ") : "") + words[0];

        if ([2, 3, 4].includes(n % 10))
            return (withNum ? (n + " ") : "") + words[1];

        return (withNum ? (n + " ") : "") + words[2];
    },

    randomString(length: number = 16) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    },
    formatPhone(number: string) {
        if (number) {
            const cleanedStr = number.replace(/\D/g, '');
            const countryCode = '+7';
            const areaCode = cleanedStr.slice(0, 3);
            const firstPart = cleanedStr.slice(3, 6);
            const secondPart = cleanedStr.slice(6, 8);
            const thirdPart = cleanedStr.slice(8, 10);

            return `${countryCode} (${areaCode}) ${firstPart} ${secondPart} ${thirdPart}`;
        }
    }
}
export default Utils;