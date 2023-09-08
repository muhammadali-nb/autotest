import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store'

// Define a type for the slice state

interface FilterDataBlock{
    name:string,
    type:string,
    open?:boolean
}
export interface SliderFilterData extends FilterDataBlock{
    from?:number,
    to?:number,

}
export interface IdValued{
    id:number,
    name:string,
}
export interface IdValuedBranded{
    id:number,
    name:string,
    brand:number
}
export interface CheckboxFilterData extends FilterDataBlock{
    values?:Array<IdValued>
}
export interface ButtonFilterData extends FilterDataBlock{
    values?:Array<IdValued>
}
export interface ModelCheckboxFilterData extends FilterDataBlock{
    values?:Array<IdValuedBranded>
}
export interface LeftFiltersData{
    price:SliderFilterData,
    year:SliderFilterData,
    brands:CheckboxFilterData,
    models:ModelCheckboxFilterData,
    carcase:CheckboxFilterData,
    engine:CheckboxFilterData,
    gearbox:CheckboxFilterData,
    drive:CheckboxFilterData,
    fuel:CheckboxFilterData,
}
export interface TopFiltersData{
    new:ButtonFilterData,
    special:ButtonFilterData,
    rent:ButtonFilterData,
}
export interface BaseState {
    loaded?:boolean,
    left:LeftFiltersData,
    top:TopFiltersData
}

// Define the initial state using that type
const mockBaseState:BaseState = {
    loaded:false,
    left:{
        price:{name:"Цена",type:"slider2",from:500000,to:5000000,open:true},
        brands:{name:"Марки",type:"checkbox",open:true,values:[
                {id:1,name:'Mercedes'},
                {id:2,name:'Kia'},
                {id:3,name:'Toyota'},
                {id:4,name:'ВАЗ'},
            ]},
        models:{name:"Модели",type:"models",open:true,values:[
                {id:1,name:'GW',brand:1},
                {id:2,name:'Ria', brand:2},
                {id:3,name:'Camry', brand:3},
                {id:4,name:'E5',brand:1},
                {id:5,name:'Politico',brand:1},
                {id:6,name:'Politico 2',brand:1},
                {id:7,name:'Politico 3',brand:1},
                {id:8,name:'Politico 4',brand:1},
                {id:9,name:'Politico 5',brand:1},
                {id:10,name:'Politico 6',brand:1},
                {id:11,name:'Politico 7',brand:1},
                {id:12,name:'Politico 8',brand:1},
                {id:13,name:'Camry 2', brand:3},
                {id:14,name:'Camry 3', brand:3},
                {id:15,name:'Camry 4', brand:3},
                {id:16,name:'Camry 5', brand:3},
                {id:17,name:'Camry 6', brand:3},
                {id:18,name:'2101', brand:4},
            ]},
        carcase:{name:"Кузов",type:"checkbox",values:[
                {id:1,name:'Седан'},
                {id:2,name:'Универсал'},
                {id:3,name:'Хэтчбек'},
                {id:4,name:'Лифтбек'},
                {id:5,name:'Купе'},
                {id:6,name:'Лимузин'},
                {id:7,name:'Кабриолет'},
                {id:8,name:'Внедорожник'},
            ]},
        engine:{name:"Двигатель",type:"checkbox",values:[
                {id:1,name:'V4'},
                {id:2,name:'V6'},
                {id:3,name:'V8'},
            ]},
        gearbox:{name:"Коробка передач",type:"checkbox",values:[
                {id:1,name:'Механическая'},
                {id:2,name:'Автоматическая'},
            ]},
        drive:{name:"Привод",type:"checkbox",values:[
                {id:1,name:'Передний'},
                {id:2,name:'Задний'},
                {id:3,name:'Полный'},
            ]},
        fuel:{name:"Вид топлива",type:"checkbox",values:[
                {id:1,name:'Бензин'},
                {id:2,name:'Дизельное'},
                {id:3,name:'Биодизельное'},
                {id:4,name:'Пропан'},
            ]},
        year:{name:"Год выпуска",type:"slider2",open:true,from:2018,to:2023},
    },
    top:{
        new:{
            name:'',
            type:'buttons',
            values:[
                {id:1, name:"Новые"},
                {id:2, name:"С пробегом"},
            ]
        },
        special:{
            name:'',
            type:'buttons',
            values:[
                {id:1, name:"Лизинг до 7 лет"},
                {id:2, name:"Аванс 0%"},
                {id:3, name:"Гарантия 150 тыс. км"},
            ]
        },
        rent:{
            name:'',
            type:'buttons',
            values:[
                {id:1, name:"Комфорт"},
                {id:2, name:"Комфорт +"},
            ]
        }
    }
}
// Define the initial state using that type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emptyMockBaseState:BaseState = {
    left:{
        price:{name:"Цена",type:"slider2",from:500000,to:5000000},
        year:{name:"Год выпуска",type:"slider2",from:2018,to:2023},
        brands:{name:"Марки",type:"checkbox",values:[]},
        models:{name:"Модели",type:"models",values:[]},
        carcase:{name:"Кузов",type:"checkbox",values:[]},
        engine:{name:"Двигатель",type:"checkbox",values:[]},
        gearbox:{name:"Коробка передач",type:"checkbox",values:[]},
        drive:{name:"Привод",type:"checkbox",values:[]},
        fuel:{name:"Вид топлива",type:"checkbox",values:[]},
    },
    top:{
        new:{
            name:'',
            type:'buttons',
            values:[]
        },
        special:{
            name:'',
            type:'buttons',
            values:[]
        },
        rent:{
            name:'',
            type:'buttons',
            values:[]
        }
    }
}
const initialState: BaseState = mockBaseState;

export const baseDataSlice = createSlice({
    name: 'baseData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setBaseState: (state, action: PayloadAction<BaseState>) => {
            if(!action.payload)
                return;
            state.loaded = true;
            state.top = action.payload.top;
            state.left = action.payload.left;
        },
    },
})

export const { setBaseState,} = baseDataSlice.actions;
export {mockBaseState}

// Other code such as selectors can use the imported `RootState` type

export default baseDataSlice.reducer