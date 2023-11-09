import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pizza } from 'types/pizza';

type pizzasState = {
  items: Pizza[];
};

const initialState: pizzasState = {
  items: [],
};

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  undefined,
  { rejectValue: string }
>('pizzas/fetchPizzas', async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch(
      'https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items'
    );
    if (!resp.ok) {
      throw new Error('Данные не пришли');
    }
    const data: Pizza[] = await resp.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }

  // {
  // if (error instanceof Error) {
  //   return rejectWithValue(error.message);
  // } else {
  //   return rejectWithValue('Ошибка сервера');
  // }
  // }
});

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        console.log('Loading data...');
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Pizza[]>) => {
          console.log('Success');
        }
      )
      .addCase(
        fetchPizzas.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          console.log(action.payload);
        }
      );
  },
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;

// {
// pizzas: [
//   {},
//   {}
// ]
// cart: []

// }
