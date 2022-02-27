import { combineReducers } from '@reduxjs/toolkit';
import groupingAndFiltersSliceReducer from './GroupingAndFilters/GroupingAndFiltersSlice';
import tradesSliceReducer from './Trades/TradesSlice';

const createRootReducer = () =>
  combineReducers({
    groupingAndFilters: groupingAndFiltersSliceReducer,
    trades: tradesSliceReducer,
  });

export default createRootReducer;
