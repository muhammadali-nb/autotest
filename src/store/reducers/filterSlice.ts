import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseState, IdValued } from './baseDataSlice'
// import type { RootState } from '../store'

// Define a type for the slice state
export interface Filter {
    price: { from: number, to: number },
    year: { from: number, to: number },
    brands: Array<number | string>,
    models: Array<number | string>,
    carcase: Array<number | string>,
    engine: Array<number | string>,
    gearbox: Array<number | string>,
    drive: Array<number | string>,
    fuel: Array<number | string>,
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

export const getFilters = createAsyncThunk<BaseState, void, { rejectValue }>(
    "filters/getFilters",
    async (_, thunkApi) => {
        try {
            const response = await axios.get('https://taxivoshod.ru/api/voshod-auto/?w=rent-filter')
            return response?.data
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response?.data)
        }
    }
)

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
    extraReducers(builder) {
        builder.addCase(getFilters.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.price = action.payload.left.price;
            state.year = action.payload.left.year;
            // state.brands = action.payload.left.brands.values

            // state.special = action.payload.left.special;
            // state.new = action.payload.left.new;
            // state.brands = action.payload.left.brands;
            // state.models = action.payload.left.models;
            // state.carcase = action.payload.left.carcase;
            // state.engine = action.payload.left.engine;
            // state.gearbox = action.payload.left.gearbox;
            // state.drive = action.payload.left.drive;
            // state.fuel = action.payload.left.fuel;
            // state.rent = action.payload.left.rent;
            // state.available = action.payload.left.available;
        })
    },
})

export const { setFilter } = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default filterSlice.reducer