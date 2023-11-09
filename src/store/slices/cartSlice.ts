import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import pizzasSlice from './pizzasSlice';
import { Pizza, Type } from 'types/pizza';

// [

//   {
//     id: 4,
//     imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
//     title: "Кисло-сладкий цыпленок",
//     price: 275,
//     totalQty: 1
//     details: [
//       {
//         type: 0,
//         sizes: [
//
//           {
//             size: 1,
//             qty: 1
//           }
//         ]
//       },

//       {
//         type: 1,
//         sizes: [
//           {
//             size: 0,
//             qty: 1
//           }
//         ]
//       },

//     ]
//   }

// ]

type CartItemSize = {
  size: 0 | 1 | 2;
  qty: number;
};

type Detail = {
  type: Type;
  sizes: CartItemSize[];
};

type CartItem = Pick<Pizza, 'id' | 'imageUrl' | 'price' | 'title'> & {
  totalQty: number;
  details: Detail[];
};

type CartState = {
  items: CartItem[];
  total: number;
  count: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<
        Pick<Pizza, 'id' | 'imageUrl' | 'price' | 'title'> & {
          activeSize: CartItemSize['size'];
          activeType: Type;
        }
      >
    ) {
      const { id, imageUrl, title, price, activeSize, activeType } =
        action.payload;
      // console.log(action.payload);
      const itemsInd = state.items.findIndex((item) => item.id == id);

      if (itemsInd == -1) {
        const item: CartItem = {
          id,
          imageUrl,
          title,
          price,
          totalQty: 1,
          details: [
            {
              type: activeType,
              sizes: [{ size: activeSize, qty: 1 }],
            },
          ],
        };
        state.items.push(item);
        state.count = state.count + 1;
        state.total = state.total + price;

        // console.log(JSON.stringify(state.items));
      } else {
        //Когда товар с таким ид уже есть, ищем где в details объект с таким же типом
        const detailsTypeInd = state.items[itemsInd].details.findIndex(
          (el) => el.type == activeType
        );
        //если нашли эл с таким типом
        if (detailsTypeInd != -1) {
          // В массиве details ищем в массиве sizes объект с таким же сайзом этого типа
          const typeSizeInd = state.items[itemsInd].details[
            detailsTypeInd
          ].sizes.findIndex((el) => el.size == activeSize);
          //Если нашли эл такого типа и с таким же сайз
          if (typeSizeInd != -1) {
            state.items[itemsInd].details[detailsTypeInd].sizes[typeSizeInd]
              .qty++;
            state.items[itemsInd].totalQty++;
            state.count = state.count + 1;
            state.total = state.total + price;
          } else {
            //Если нашли эл такого типа но сайза такого еще не было
            const sizesItem = {
              size: activeSize,
              qty: 1,
            };
            //то в существующий тип доб в массив объект с новым сайзом в кол 1 штука
            state.items[itemsInd].details[detailsTypeInd].sizes.push(sizesItem);
            state.items[itemsInd].totalQty++;
            state.count = state.count + 1;
            state.total = state.total + price;
          }
          // console.log(JSON.stringify(state.items));
        } else {
          //если не нашли эл с таким типом тогда доюавляем ее впервые такого типа
          const detailsItem = {
            type: activeType,
            sizes: [
              {
                size: activeSize,
                qty: 1,
              },
            ],
          };
          state.items[itemsInd].details.push(detailsItem);
          state.items[itemsInd].totalQty++;
          state.count = state.count + 1;
          state.total = state.total + price;
          // console.log(JSON.stringify(state.items));
        }
      }

      //как прочитать state здесь
      // console.log(JSON.stringify(state.items));
      // state.count = state.items.reduce((count, item) => count + item.qty, 0);
      // state.total =
    },
    deleteItem(
      state,
      action: PayloadAction<
        Pick<Pizza, 'id' | 'price' | 'imageUrl' | 'title'> & {
          activeSize: CartItemSize['size'];
          activeType: Type;
        }
      >
    ) {
      const { id, price, activeSize, activeType } = action.payload;
      state.items.forEach((item) => {
        if (item.id == id) {
          item.details.forEach((detailsItem) => {
            if (detailsItem.type == activeType) {
              detailsItem.sizes.forEach((sizesItem, ind) => {
                if (sizesItem.size == activeSize) {
                  if (sizesItem.qty <= 1) {
                    detailsItem.sizes.splice(ind, 1);
                  } else {
                    sizesItem.qty--;
                  }
                  item.totalQty--;
                  state.count--;
                  state.total = state.total - price;
                  if (state.count == 0) state.items = [];
                }
              });
            }
          });
        }
      });
    },

    clearItems(state) {
      state.items = [];
      state.count = 0;
      state.total = 0;
    },
  },
});

export const { addItem, deleteItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
