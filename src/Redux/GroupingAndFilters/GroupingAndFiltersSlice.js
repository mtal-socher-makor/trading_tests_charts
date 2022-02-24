import { createSlice } from '@reduxjs/toolkit';
export const groupingAndFiltersSlice = createSlice({
  name: 'groupAndFilters',
  initialState: {
    grouping: {
      allBtn: true,
      side: false,
      type: false,
      location: false,
      thread: false,
    },
    filters: {
      servers: [],
      types: [],
      sides: [],
      products: [],
      threads: ['multi'],
    },
  },

  reducers: {
    setGroupBy: (state, action) => {
      state.grouping.forEach((group) => {
        if (group !== action.payload) {
          state.grouping[group] = false;
        } else {
          state.grouping[group] = true;
        }
      });
    },
    setFilters: (state, action) => {
      if (action.payload === 'threads') {
        if (state.filters.threads.length > 0) {
          state.filters.threads.pop();
        } else {
          state.filters.threads.push('multi');
        }
      }
    },
  },
});

export const { setGroupBy, setFilters  } = groupAndFilters.actions;
