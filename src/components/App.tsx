import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import useRoutesWrapper from '../hooks/useRoutesWrapper';
import NotFound from '../pages/NotFound';
import Layout from './Layout';
import Home from '../pages/Home';


import { fetchPizzas, setPizzas } from '../store/slices/pizzasSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Pizza } from 'types/pizza';
import Cart from 'pages/Cart';


type AppContextProps = {
  pizzas?: Pizza[];
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  setSearch?: (search: string) => void;
}

export const AppContext = createContext<AppContextProps>({});

function App() {
  const activeCategory = useAppSelector((state) => state.filter.category);
  const { isUp, type } = useAppSelector((state) => state.filter.sort);
  const pizzas = useAppSelector((state) => state.pizzas.items);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const store = { pizzas, loading, setLoading, setSearch };

  // type b = {
  //   pizzas?: typeof pizzas;
  //   setPizzas?: typeof setPizzas;
  //   loading?: typeof loading;
  //   setLoading?: typeof setLoading;
  //   setSearch?: typeof setSearch;
  // }

  // export const AppContext = createContext<b>({});

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]);

  useEffect(() => {
    const category = activeCategory == 0 ? '' : activeCategory;
    const sort = ['rating', 'price', 'title'];
    const order = isUp ? 'asc' : 'desc';

    Promise.all([
      fetch(
        `https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?category=${category}&sortBy=${sort[type]}&order=${order}`
      ),
      fetch(
        `https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?search=${search}`
      ),
    ])
      .then(([sorted, searched]) => {
        return Promise.all([sorted.json(), searched.json()]);
      })
      .then(([sorted, searched]: [Pizza[], Pizza[]]) => {
        const newData = sorted.filter((sortedItem) =>
          searched.some((searchedItem) => sortedItem.id == searchedItem.id)
        );
        dispatch(setPizzas(newData));
      })


      .finally(() => setLoading(false))
      .catch((err) => {
        //Отрисовать в поле пицц сообщение об ошибке
        alert(`Ошибка запроса к серверу: ${err.message}`);
      });
  }, [dispatch, activeCategory, type, isUp, search]);

  return (
    // <>
    //   {routes}
    // </>
    <AppContext.Provider value={store}>
      {/* {JSON.stringify(data)} */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
//    <Layout>
//  {routes}
//    </Layout>
