import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store'

// Define a type for the slice state
export interface Filter {
    price: { from: number, to: number },
    year: { from: number, to: number },
    brands: Array<number>,
    models: Array<number>,
    carcase: Array<number>,
    engine: Array<number>,
    gearbox: Array<number>,
    drive: Array<number>,
    fuel: Array<number>,
    special: number,
    new: number,
    rent: number,
    available?: boolean,
}
export const defaultFilter: Filter = {
    price: { from: 500000, to: 5000000 },
    year: { from: 2018, to: 2023 },
    special: 0, new: 0, rent: 0, available: undefined,
    brands: [], models: [], carcase: [], engine: [], gearbox: [], drive: [], fuel: [],
}

const initialState: Filter = defaultFilter;

export const filterSlice = createSlice({
    name: 'filter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Filter>) => {
            if (!action.payload)
                return;
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
        },
    },
})

export const { setFilter } = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default filterSlice.reducer