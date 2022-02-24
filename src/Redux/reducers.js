import { combineReducers } from '@reduxjs/toolkit';
import { groupingAndFiltersSlice } from './GroupingAndFilters/GroupingAndFiltersSlice';


const createRootReducer = () =>
  combineReducers({
      groupingAndFilters : groupingAndFiltersSlice
  });

export default createRootReducer;
