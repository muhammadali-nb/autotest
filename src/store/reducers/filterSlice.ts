import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseState, IdValued } from './baseDataSlice'
// import type { RootState } from '../store'

// Define a type for the slice state
export interface Filter {
    price: { from: number | null, to: number | null },
    year: { from: number | null, to: number | null },
    brands: Array<number | string>,
    models: Array<number | string>,
    carcase: Array<number | string>,
    engine: Array<number | string>,
    gearbox: Array<number | string>,
    drive: Array<number | string>,
    fuel: Array<number | string>,
    special: null | string,
    tarif: null | string
    new: number,
    rent: number,
    available?: boolean,
}
export const defaultFilter: Filter = {
    price: { from: null, to: null },
    year: { from: null, to: null },
    tarif: null,
    special: null, new: 0, rent: 0, available: undefined,
    brands: [], models: [], carcase: [], engine: [], gearbox: [], drive: [], fuel: [],
}



const initialState: Filter = defaultFilter;

export const filterSlice = createSlice({
    name: 'filter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Filter>) => {
            if (!action.payload) {
                return;
            }

            state.price = action.payload.price;
            state.year = action.payload.year;
            state.special = action.payload.special;
            state.new = action.payload.new;
            state.brands = action.payload.brands;
            state.models = action.payload.models;
            state.carcase = action.payload.carcase;
            state.engine = action.payload.engine;
            state.gearbox = action.payload.gearbox;
            state.drive = action.payload.drive;
            state.fuel = action.payload.fuel;
            state.rent = action.payload.rent;
            state.available = action.payload.available;
            state.tarif =  action.payload.tarif;
        },
    },

})

export const { setFilter } = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default filterSlice.reducer