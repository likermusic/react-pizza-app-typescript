import React, { useContext } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import { AppContext } from '../components/App';

function Home() {
  const { pizzas, loading } = useContext(AppContext);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      {loading == false && pizzas && (pizzas.length > 0) ? (
        <h2 className='content__title'>Все пиццы</h2>
      ) : (
        <h2 className='content__title'>Пиццы не найдены</h2>
      )}
      <div className='content__items'>
        {!loading && pizzas ? pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />) : (
          <div>
            {[...new Array(10)].map((_, ind) => (
              <Skeleton key={ind} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
