import { createSlice } from "@reduxjs/toolkit";
import { tradesSlice } from "../Trades/TradesSlice";
import { contourDensity, scaleOrdinal } from "d3";

export const groupingAndFiltersSlice = createSlice({
  name: "groupAndFilters",
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
      threads: ["multi"],
    },
    mode: false,
    timesMode: false,
  },

  reducers: {
    initializeGrouping: (state, action) => {
      Object.keys(state.grouping).forEach((key) => {
        if (key !== "allBtn") {
          state.grouping = { ...state.grouping, [key]: false };
        } else {
          state.grouping = { ...state.grouping, [key]: true };
        }
      });
    },
    setGroupBy: (state, action) => {
      Object.keys(state.grouping).forEach((key) => {
        if (key !== action.payload) {
          state.grouping[key] = false;
        } else {
          state.grouping[key] = true;
        }
      });
    },

    setFilters: (state, action) => {
      if (action.payload === "threads") {
        if (state.filters.threads.length > 0) {
          state.filters.threads.pop();
        } else {
          state.filters.threads.push("multi");
        }
      }
    },
    setGlobalFilters: (state, action) => {
      let key = action.payload.label;
      let value =
        key === "servers" ? action.payload.server : action.payload.value;
      if (key !== "servers" && key !== "products") {
        state.filters = {
          ...state.filters,
          [key]: typeof value === "string" ? value.split(",") : value,
        };
      } else if (key === "servers") {
        if (state.filters[key].some((s) => s.ip === value.ip)) {
          state.filters[key] = state.filters[key].filter(
            (x) => x.ip !== value.ip
          );
        } else {
          state.filters = {
            ...state.filters,
            [key]: [...state.filters[key], value],
          };
        }
      } else if (key === "products") {
        if (
          state.filters[key].includes(value) &&
          state.filters[key].length > 0
        ) {
          state.filters[key] = state.filters[key].filter((p) => p !== value);
        } else {
          console.log(state.filters.products);

          state.filters = {
            ...state.filters,
            [key]: [...state.filters[key], value],
          };
        }
      }
    },
    setMode: (state, action) => {
      state.mode = !state.mode;
    },
    setTimesMode: (state, action) => {
      state.timesMode = !state.timesMode;
    },
  },
});

export const {
  initializeGrouping,
  setGroupBy,
  setFilters,
  setGlobalFilters,
  setMode,
  setTimesMode,
} = groupingAndFiltersSlice.actions;
export default groupingAndFiltersSlice.reducer;
