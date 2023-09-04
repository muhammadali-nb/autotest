import {CallRequestData} from "./Api";

let Utils = {
    validatePhone(phone:string){
        return !!phone.replace(/\D+/g, '').match(/[78]\d{10}/)
    },
    validateForm(request:CallRequestData,needComment:string|boolean=false){
        let errors = {};
        if(!request.name)
            errors['name'] = "Не указано имя";
        // if(!data.lastName)
        //     errors['lastName'] = "Не указано имя";
        if(!request.phone || request.phone ==='+7')
            errors['phone'] = "Не указан номер телефона";
        if(!Utils.validatePhone(request.phone))
            errors['phone'] = "Телефон в неверном формате";
        if(!request.confirm)
            errors['confirm'] = true;
        if(needComment && !request.comment)
            errors['comment'] = needComment;
        return errors;
    },
    cleanPhone(phone:string){
        if(!Utils.validatePhone(phone))
            return '';
        let ph = phone.replace(/\D+/g, '');
        if(ph.startsWith('7'))
            ph = "+" + ph;
        return ph.startsWith('7') ? "+" + ph : ph;
    },

    textFromCount(n:number, words:Array<string>, withNum:boolean = true) {
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

    randomString(length:number = 16){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}
export default Utils;