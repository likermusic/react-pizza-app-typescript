import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  type: 0 | 1 | 2;
  isUp: boolean;
};

type filterState = {
  category: number;
  sort: Sort;
  search: string;
};

const initialState: filterState = {
  category: 0,
  sort: { type: 0, isUp: true },
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<filterState['category']>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setSort } = filterSlice.actions;
export default filterSlice.reducer;
