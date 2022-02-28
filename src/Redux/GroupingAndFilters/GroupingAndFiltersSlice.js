import { createSlice } from '@reduxjs/toolkit'
import { tradesSlice } from '../Trades/TradesSlice'
import { scaleOrdinal } from 'd3'

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
    mode: false,
    timesMode: false,
  },

  reducers: {
    initializeGrouping: (state, action) => {
      Object.keys(state.grouping).forEach((key) => {
        if (key !== 'allBtn') {
          state.grouping = { ...state.grouping, [key]: false }
        } else {
          state.grouping = { ...state.grouping, [key]: true }
        }
      })
    },
    setGroupBy: (state, action) => {
      Object.keys(state.grouping).forEach((key) => {
        if (key !== action.payload) {
          state.grouping[key] = false
        } else {
          state.grouping[key] = true
        }
      })
    },

    setFilters: (state, action) => {
      if (action.payload === 'threads') {
        if (state.filters.threads.length > 0) {
          state.filters.threads.pop()
        } else {
          state.filters.threads.push('multi')
        }
      }
    },
    setGlobalFilters: (state, action) => {
      let key = action.payload.label
      let value = action.payload.value
      state.filters = { ...state.filters, [key]: typeof value === 'string' ? value.split(',') : value }
    },
    setMode: (state, action) => {
      state.mode = !state.mode
    },
    setTimesMode: (state, action) => {
      state.timesMode = !state.timesMode
    },
  },
})

export const { initializeGrouping, setGroupBy, setFilters, setGlobalFilters, setMode, setTimesMode } = groupingAndFiltersSlice.actions
export default groupingAndFiltersSlice.reducer
