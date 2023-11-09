import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './App';
import { setCategory } from '../store/slices/filterSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const activeCategory = useAppSelector((state) => state.filter.category);
  const dispatch = useAppDispatch();

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, ind) => (
            <li onClick={() => dispatch(setCategory(ind))} key={ind} className={ind == activeCategory ? 'active' : ''}>{category}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories