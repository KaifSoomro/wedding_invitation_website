import { createSlice } from "@reduxjs/toolkit";

const tempSlice = createSlice({
  name: "TempSlice",
  initialState: {
    orientation: [],
    theme: [],
    category: [],
    sortBy: "popular"
  },
  reducers: {
    toggleFilter: (state, action) => {
      const { filterType, value } = action.payload;
      const current = state[filterType];

      if (Array.isArray(current)) {
        const index = current.indexOf(value);
        if (index > -1) {
          current.splice(index, 1); 
        } else {
          current.push(value); 
        }
      } else {
        state[filterType] = value; 
      }
    },
    clearFilter: (state, action) => {
      const { filterType } = action.payload;
      state[filterType] = Array.isArray(state[filterType]) ? [] : "";
    }
  }
});


export const {toggleFilter,clearFilter} = tempSlice.actions;
export default tempSlice.reducer;
