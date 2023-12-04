
import { BaseState, mockBaseState } from "./store/reducers/baseDataSlice";
import { CarData, CarDataInfo, CarRentDataInfo } from "./components/common/CarCard";
import { Filter } from "./store/reducers/filterSlice";
import _ from 'lodash';
import { CarDataType } from "./types/RentTypes";



export interface FaqResponseEntry {
  title: string,
  text: string
}
export interface FaqResponse {
  faq: Array<FaqResponseEntry>
}
const mockFaq: (string) => FaqResponse = (type?: string) => {
  let defaultAnswer = 'Список ответов на часто задаваемые вопросы от наших клиентов постоянно пополняется. Напишите нам,' +
    ' чтобы мы могли дополнить список.'

  let leasing = {
    faq: [
      {
        title: 'Кто платит транспортный налог?',
        text: 'Транспортный налог оплачивает компания.\n' +
          'С клиента списывается сумма в размере транспортного налога.'
      },
      {
        title: 'Кто платит штрафы за нарушение ПДД?',
        text: 'Штрафы ПДД оплачивает компания.\n' +
          'Позднее с клиента происходят списания, согласно договору.'
      },
      {
        title: 'Как отслеживать штрафы за нарушение ПДД?',
        text: 'Штрафы за нарушение ПДД возможно отследить в личном кабинете на сайте http://voshod-auto.ru/.'
      },
      {
        title: 'Что делать если потерял СТС/ПТС?',
        text: 'Обратиться за помощью к сотрудникам компании (в офис).'
      },
      {
        title: 'Как досрочно выкупить автомобиль?',
        text: 'Обратиться к сотрудникам компании, для перерасчета графика платежей.'
      },
      {
        title: 'Может ли третье лицо вносить за меня платежи?',
        text: 'Третье лицо может вносить за вас платежи.'
      },
      {
        title: 'Должен ли я оформлять/продлевать КАСКО?',
        text: 'КАСКО оформляется/ продлевается в обязательном порядке в офисе компании.'
      },
      {
        title: 'Окончание договора лизинга, мои шаги?',
        text: 'Подъехать в офис компании для подписания договора купли продажи, а также акта приема передачи автомобиля.\n' +
          'Понадобятся следующие документы: паспорт, действующий договор лизинга на автомобиль.'
      },
      {
        title: 'Заканчивается договор лизинга, как происходит выкуп?',
        text: 'Обращаетесь к нам в офис для подписания договора купли продажи, а также акта приема передачи автомобиля.'
      },
      {
        title: 'У меня нет возможности дальше оплачивать платежи, что будет?',
        text: 'Заключить с нами соглашение о расторжении действующего договора (при условии целостности и сохранности автомобиля).'
      },
    ]
  }
  let rent = { //rent
    faq: [
      {
        title: 'Когда начинается расчетный час оплаты? С какого времени считаются сутки?',
        text: 'Сутки считаются со времени выдачи автомобиля.'
      },
      {
        title: 'Можно ли оформить аренду на двоих членов семьи (например мужа и жену)? Сколько это будет стоить?',
        text: 'Вы можете оформить аренду на второго члена семьи. Стоимость аренды не изменится.'
      },
      {
        title: 'Кто платит штрафы за нарушение ПДД?',
        text: 'Стоимость штрафа списывается с Вашего счета с коэффициентом 1,5.'
      },
      {
        title: 'Как отслеживать штрафы за нарушение ПДД?',
        text: 'Штрафы отслеживаем мы и сообщаем Вам о правонарушениях.'
      },
      {
        title: 'Хочу вернуть автомобиль раньше срока, мне пересчитают оплату?',
        text: 'Нет, возврат автомобиля без предупреждения происходит без возврата депозита.'
      },
      {
        title: 'Сколько топлива должно быть в баке при возврате автомобиля?',
        text: 'Такое же количество, с каким забирали автомобиль.'
      },
      {
        title: 'Я могу на этом автомобиле выехать за пределы СПб и ЛО?',
        text: 'Вы можете выехать за пределы СПб и ЛО по согласованию с нашим специалистом.'
      },
      {
        title: 'Какие ограничения по пробегу автомобиля в сутки?',
        text: 'Передвижения по СПб и ЛО с лимитом 350 км/ сутки; перекат – 10 руб/ км.\n' +
          'Передвижения по России с лимитом 350 км/ сутки; перекат – 10 руб/ км.'
      },
      {
        title: 'Как отменить бронь?',
        text: 'Позвонить нам по телефону или отменить самостоятельно на сайте (если ранее бронировали онлайн).'
      },
      {
        title: 'Можно ли перевозить в машине домашних животных?',
        text: 'Нет, домашних животных перевозить нельзя.'
      },
    ]
  }

  if (type === 'leasing')
    return leasing;
  if (type === 'rent')
    return rent;
  return leasing;
  return {
    faq: [
      { title: 'Кто платит транспортный налог?', text: defaultAnswer },
      { title: 'Кто платит штрафы за нарушение ПДД?', text: defaultAnswer },
      { title: 'Как отслеживать штрафы за нарушение ПДД?', text: defaultAnswer },
      { title: 'Что делать если потерял СТС/ПТС?', text: defaultAnswer },
      { title: 'Как досрочно выкупить автомобиль?', text: defaultAnswer },
      { title: 'Может ли третье лицо вносить за меня платежи?', text: defaultAnswer },
      { title: 'Должен ли я оформлять/продлевать КАСКО?', text: defaultAnswer },
      { title: 'Окончание договора лизинга, мои шаги?', text: defaultAnswer },
      { title: 'Заканчивается договор лизинга, как происходит выкуп?', text: defaultAnswer },
      { title: 'У меня нет возможности дальше оплачивать платежи, что будет?', text: defaultAnswer },
    ]
  }
}


export interface PaginatedResponse {
  per_page: number,
  page: number,
  pages: number, // сколько страниц всего
  count: number,
}
export interface CatalogResponse extends PaginatedResponse {
  list: Array<CarDataInfo>
}
export const mockCarData: () => CarData = () => {
  return {
    main: {
      id: Math.floor(Math.random() * 50000),
      brand: Math.ceil(Math.random() * 4),
      model: Math.ceil(Math.random() * 3),
      year: Math.floor(2018 + Math.random() * 6),
      special: [1, 2, 3],
      thumb: '/dummy/dummy-car.png',
      price: Math.floor(150000 + Math.random() * 1500000),
      pay: Math.floor(1000 + Math.random() * 20000),
    },
    images: [
      { full: '/dummy/dummy-car-big.png', thumb: '/dummy/dummy-car.png' },
      { full: '/dummy/dummy-car-big.png', thumb: '/dummy/dummy-car.png' },
      { full: '/dummy/dummy-car-big.png', thumb: '/dummy/dummy-car.png' },
      { full: '/dummy/dummy-car-big.png', thumb: '/dummy/dummy-car.png' },
    ],
    info: [
      {
        name: "Информация", list: [
          { name: 'Объем', value: "2,0 литра" },
          { name: 'Мощность', value: "250hp" },
          { name: 'Топливо', value: "Дизельное" },
          { name: 'Коробка', value: "Автоматическая" },
          { name: 'Привод', value: "Передний" },
          { name: 'Кузов', value: "Седан" },
          { name: 'Год', value: "2023" },
        ]
      }
    ],
    tech: [ // Тут блок технических характеристик
      {
        name: "Двигатель",
        list: [
          { name: 'Рабочий объем, куб. см', value: "1995" },
          { name: 'Максимальный крутящий момент, Н•м при об/мин', value: "330/1750-1750" },
          { name: 'Максимальная мощность, л. с. при об/мин', value: "150/4000-4000" },
          { name: 'Количество цилиндров / клапанов на цилиндр', value: "4/4" },
        ] // как у блока информациия пары название-значение
      },
      {
        name: "Ходовые качества",
        list: [
          { name: 'Максимальная скорость, км/ч', value: "204" },
          { name: 'Время разгона 0–100 км/ч, сек', value: "9,3" },
        ] // как у блока информациия пары название-значение
      },
      {
        name: "РАСХОД ТОПЛИВА",
        list: [
          { name: 'Смешанный цикл, л/100 км', value: "204" },
          { name: 'Загородный цикл, л/100 км', value: "9,3" },
          { name: 'Городской цикл, л/100 км', value: "150/4000-4000" },
          { name: 'Выброс СО2, г/км', value: "4/4" },
        ] // как у блока информациия пары название-значение
      },
      {
        name: "ГАБАРИТЫ",
        list: [
          { name: 'Длина, мм', value: "4447" },
          { name: 'Высота, мм (вместе с антенной)', value: "1598" },
          { name: 'Ширина, мм', value: "1821" },
          { name: 'Клиренс, мм', value: "183" },
        ] // как у блока информациия пары название-значение
      },
      {
        name: "МАССА",
        list: [
          { name: 'Собственная масса (ЕС), кг', value: "1660" },
        ] // как у блока информациия пары название-значение
      },
      // любое количество таких блоков в технических характеристиках
    ],
    standard: [ // Тут блок стандартного оборудования
      {
        name: "Коробка передач и ходовая часть",
        list: [ // как у блока информациия пары название-значение. Но значение везде будет пустым. Соответственно не надо ставить многоточие и выводить значение. Такой формат делаю для совместимости с блоком технической информации. Ну и для сохранения возможности выводить пары название-значение
          {
            name: "Автоматическая коробка передач Steptronic",
            value: ""
          },
          {
            name: "Система Performance Control",
            value: ""
          }
        ]
      },
      {
        name: "Экстерьер",
        list: [
          { name: 'Ламповый приемник', value: "" },
          { name: 'Винтажное издание YandexMap', value: "" },
        ] // как у блока выше
      }
      // любое количество таких блоков
    ],
  }
}

export const defaultCars: CatalogResponse = {
  per_page: 24,
  page: 1,
  pages: 15, // сколько страниц всего
  count: 195,
  list: [
    mockCarData().main, mockCarData().main, mockCarData().main, mockCarData().main,
    mockCarData().main, mockCarData().main, mockCarData().main, mockCarData().main,
    mockCarData().main,
  ]
}

export interface RentCreateAccountForm {
	name: string;
	lastName: string;
	middleName: string;
	image: string;
	errors: any;
}

export interface RentResponse extends PaginatedResponse {
  list: Array<CarRentDataInfo>
}
export const mockRentCarData: () => CarRentDataInfo = () => {
  return {
    id: Math.floor(Math.random() * 50000),
    tarif_name: "Comfort",
    available_at: false,
    brand: Math.ceil(Math.random() * 4),
    model: Math.ceil(Math.random() * 3),
    year: Math.floor(2018 + Math.random() * 6),
    special: [Math.ceil(Math.random() * 2)],
    thumb: '/dummy/dummy-car.png',
    price: Math.floor(150000 + Math.random() * 1500000),
    pay: Math.floor(1000 + Math.random() * 20000),
    deposit: Math.floor(10000 + Math.random() * 50000),
    rentpay: Math.floor(1000 + Math.random() * 10000),
    regnum: 'A 012 EA 78',
    run: Math.floor(10000 + Math.random() * 50000),
    available: Math.random() > 0.5
  }
}



export const defaultRentCarsDetail: CarRentDataInfo = {
  ...mockRentCarData()
}

export const defaultRentCars: RentResponse = {
  per_page: 24,
  page: 1,
  pages: 15, // сколько страниц всего
  count: 195,
  list: [
    mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(),
    mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(), mockRentCarData(),
    mockRentCarData(),
  ]
}

export const defaultRecommendCars: Array<CarDataInfo> = [
  mockCarData().main, mockCarData().main, mockCarData().main, mockCarData().main
]
export type ErrorResponse = {
  error: string,
  message: string,
  messageBag?: Array<string>
  code?: number
}
const defaultError: ErrorResponse = { error: 'Ошибка', message: 'Ошибка связи с сервером', code: -1 };

export type CallRequestData = {
  name: string,
  middleName?: string,
  lastName: string,
  phone: string,
  confirm: boolean,
  comment?: string,
  email?: string,
  errors: object,

}

export interface CallRequestResponse { success: boolean, fields?: object }

export type ConfirmPhone = {
  phone: string
  errors: object
  confirm: boolean
}

export interface MessageOfTheDay {
  type?: "warning" | "error" | "message",
  text: string,
}

let Api = {

  isError(resp: ErrorResponse | any): resp is ErrorResponse {
    return !(typeof resp == 'object') || Object.keys(resp).length === 0 || (typeof resp['error'] !== 'undefined');
  },

  getApi() {
    let host = _.trim(process.env.REACT_APP_API_HOST ?? '', '/') + '/' + _.trim(process.env.REACT_APP_API_VERSION ?? '', '/');
    return host;
  },

  postEndpoint(endpoint: string, params?: object, headers?: any) {
    let path = this.getApi() + "/" + _.trim(endpoint, '/');
    try {
      return fetch(path, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: this.getHeaders(headers),
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin,
        // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }).then(resp => resp.json());
    } catch (e) {
      return new Promise<ErrorResponse>((resolve, reject) => {
        setTimeout(() => {
          resolve(defaultError);
        }, 100);
      })
    }

  },
  getEndpoint(endpoint: string, params?: any, headers?: any) {
    let path = this.getApi() + "/" + _.trim(endpoint, '/');
    let query = new URLSearchParams(params).toString()
    // console.log(query, params);
    return fetch(path + "?" + query, {
      headers: this.getHeaders(headers),
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin,
      // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(resp => resp.json());
  },
  getHeaders(headers: any) {
    return {
      "Content-Type": "application/json",
      ...(typeof headers == 'object' ? headers : {})
    }
  },

  baseDataAsync(): Promise<BaseState | ErrorResponse> {

    if (process.env.REACT_APP_TEST) {
      const res = mockBaseState;
      let p = new Promise<BaseState>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    return this.getEndpoint('base')
  },
  async baseData() {
    try {
      return await this.baseDataAsync();
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  motdAsync(page: string): Promise<MessageOfTheDay | ErrorResponse> {

    if (process.env.REACT_APP_TEST) {
      let res: MessageOfTheDay = { type: 'error', text: '' };

      if (page === 'catalog')
        res.text = process.env.REACT_APP_WARNING_CATALOG_MESSAGE ?? "";
      else if (page === 'rent')
        res.text = process.env.REACT_APP_WARNING_RENT_MESSAGE ?? "";

      if (process.env.REACT_APP_NO_CATALOG === 'true')
        res.text = process.env.REACT_APP_NO_CATALOG_WARNING ?? '';

      let p = new Promise<MessageOfTheDay>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    return this.getEndpoint('motd', { page })
  },
  async motd(page: string) {
    try {
      return await this.motdAsync(page);
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  recommendAsync(): Promise<Array<CarDataInfo> | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      const res = defaultRecommendCars;
      let p = new Promise<Array<CarDataInfo>>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    return this.getEndpoint('recommend')
  },
  async recommend() {
    try {
      return await this.recommendAsync();
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  catalogAsync(filter: Filter, query: URLSearchParams): Promise<CatalogResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      const res = defaultCars;
      let p = new Promise<CatalogResponse>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 1200);
      })
      return p;
    }
    Object.fromEntries(query)
    return this.postEndpoint('catalog', query)
  },
  async catalog(filter: Filter, query: URLSearchParams) {
    try {
      return await this.catalogAsync(filter, query);
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }


  },

  rentAsync(filter: Filter, query: URLSearchParams): Promise<RentResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      const res = defaultRentCars;
      let p = new Promise<RentResponse>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    Object.fromEntries(query)
    return this.postEndpoint('rent', query)
  },
  async rent(filter: Filter, query: URLSearchParams) {
    try {
      return await this.rentAsync(filter, query);
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }

  },

  rentCarAsync(id): Promise<CarRentDataInfo | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      const res = defaultRentCarsDetail;
      let p = new Promise<CarRentDataInfo>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    return this.getEndpoint('rent' + id)
  },
  async rentCar(id) {
    try {
      return await this.rentCarAsync(id);
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  carAsync(id): Promise<CarData | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      const res = mockCarData();
      let p = new Promise<CarData>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    return this.getEndpoint('cars/' + id)
  },
  async car(id) {
    try {
      return await this.carAsync(id);
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  faqAsync(type): Promise<FaqResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      const res = mockFaq(type);
      let p = new Promise<FaqResponse>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }
    return this.getEndpoint('faq/', { type: type })
  },
  async faq(id) {
    try {
      return await this.faqAsync(id);
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  async callRequest(request: CallRequestData): Promise<CallRequestResponse | ErrorResponse> {
    // if(process.env.REACT_APP_TEST === "true") {
    //   let isValid = !!request.phone.replace(/\D+/g, '').match(/79999999999/);
    //   let res = {success:isValid};
    //   if(!isValid)
    //     res['fields'] = {phone:'Тест, только +7 999 999 99 99 валиден!',name:'Эмуляция ответа от сервера'}
    //   let p = new Promise<{success:boolean,fields?:object}>((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(res);
    //     }, 100);
    //   })
    //   return p;
    // }

    try {
      return await this.postEndpoint('call_request.php', { request })
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },
  async carRequest(request: CallRequestData): Promise<CallRequestResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      let isValid = !!request.phone.replace(/\D+/g, '').match(/79999999999/);
      let res = { success: isValid };
      if (!isValid)
        res['fields'] = { phone: 'Тест, только +7 999 999 99 99 валиден!', name: 'Эмуляция ответа от сервера' }
      let p = new Promise<{ success: boolean, fields?: object }>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }

    try {
      return await this.postEndpoint('carRequest', { request })
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },
  async carBookRequest(request: CallRequestData, car: CarDataInfo): Promise<CallRequestResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      let isValid = !!request.phone.replace(/\D+/g, '').match(/79999999999/);
      let res = { success: isValid };
      if (!isValid)
        res['fields'] = { phone: 'Тест, только +7 999 999 99 99 валиден!', name: 'Эмуляция ответа от сервера' }
      let p = new Promise<{ success: boolean, fields?: object }>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }

    try {
      return await this.postEndpoint('carBookRequest', { request: request, car: car })
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },




  async carRentCodeRequest(request: CallRequestData): Promise<CallRequestResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      let isValid = !!request.phone.replace(/\D+/g, '').match(/79999999999/);
      let res = { success: isValid };
      if (!isValid)
        res['fields'] = { phone: 'Тест, только +7 999 999 99 99 валиден!', name: 'Эмуляция ответа от сервера' }
      let p = new Promise<{ success: boolean, fields?: object }>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }

    try {
      return await this.postEndpoint('carRentCodeRequest', { request })
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },

  async carRentConfirmRequest(request: CallRequestData, code: string): Promise<CallRequestResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      let isValid = !!code.replace(/\D+/g, '').match(/123456/);
      let res = { success: isValid };
      if (!isValid)
        res['fields'] = { code: 'Тест, только код 123456 валиден!' }
      let p = new Promise<{ success: boolean, fields?: object }>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }

    try {
      return await this.postEndpoint('carRentConfirmRequest', { request: request, code: code })
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },
  async carRentPaymentRequest(request: CallRequestData, car: CarRentDataInfo | CarDataType, payment: string = ''): Promise<CallRequestResponse | ErrorResponse> {
    if (process.env.REACT_APP_TEST === "true") {
      let isValid = payment === 'sbp';
      let res = { success: isValid, fields: { link: 'https://vk.com', error: '' } };
      if (!isValid) {
        res.fields.error = 'Не удалось получить ссылку на банковский шлюз для оплаты';
        res.fields.link = '';
      }
      let p = new Promise<{ success: boolean, fields?: object }>((resolve, reject) => {
        setTimeout(() => {
          resolve(res);
        }, 100);
      })
      return p;
    }

    try {
      return await this.postEndpoint('carRentPaymentRequest', { request: request, car: car, payment: payment })
    } catch (e) {
      return await new Promise<ErrorResponse>((resolve, reject) => resolve(defaultError))
    }
  },
}

export default Api;