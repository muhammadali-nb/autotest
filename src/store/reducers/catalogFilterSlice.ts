import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Filter } from "./filterSlice";

export interface CatalogFilter {
  price: { from: number | null, to: number | null },
  year: { from: number | null, to: number | null },
  brands: Array<number | string>,
  models: Array<number | string>,


  tags: null | string
  condition: null | string,

}

export const defaultFilter: CatalogFilter = {
  price: { from: null, to: null },
  year: { from: null, to: null },
  tags: null,
  condition: null,
  brands: [], models: []
}
const initialState: CatalogFilter = defaultFilter;

export const catalogFilterSlice = createSlice({
  name: 'catalogFilter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCatalogFilter: (state, action: PayloadAction<CatalogFilter>) => {
      if (!action.payload) {
        return;
      }
      state.price = action.payload.price;
      state.year = action.payload.year;
      state.condition = action.payload.condition;
      state.brands = action.payload.brands;
      state.models = action.payload.models;
      state.tags = action.payload.tags;
    },
  },

})

export const { setCatalogFilter } = catalogFilterSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default catalogFilterSlice.reducer