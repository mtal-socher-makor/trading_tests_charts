import { createSlice } from "@reduxjs/toolkit";
export const tradesSlice = createSlice({
  name: "trades",
  initialState: {
    dataStates: {
      stateTrades: [],
      stateTradesPartly: [],
      typeTrades: {},
      sideTrades: {},
      locationTrades: {},
      threadTrades: {},
    },
    products: [],
  },
  reducers: {
    intializeStates: (state) => {
      Object.keys(state.dataStates).forEach((key) => {
        if (key !== "stateTradesPartly" && key !== "stateTrades") {
          state.dataStates[key] = {};
        } else {
          state.dataStates[key] = [];
        }
      });
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setStateTrades: (state, action) => {
      state.dataStates.stateTrades = [
        ...state.dataStates.stateTrades,
        action.payload,
      ];
    },
    sortBy: (state, action) => {
      let givenGroup = action.payload;
      if (state.dataStates.stateTrades.length > 0) {
        let key =
          state.dataStates.stateTrades[state.dataStates.stateTrades.length - 1][
            givenGroup
          ];
        if (givenGroup === "thread") {
          key = key.toString();
        }
        let section = `${givenGroup}Trades`;
        state.dataStates[section] = {
          ...state.dataStates[section],
          [key]: state.dataStates[section][key]
            ? [
                ...state.dataStates[section]?.[key],
                state.dataStates.stateTrades[
                  state.dataStates.stateTrades.length - 1
                ],
              ]
            : [
                state.dataStates.stateTrades[
                  state.dataStates.stateTrades.length - 1
                ],
              ],
        };
      }
    },
    setStateTradesPartly: (state, action) => {
      let last =
        state.dataStates.stateTrades[state.dataStates.stateTrades.length - 1];
      state.dataStates.stateTradesPartly = [
        ...state.dataStates.stateTradesPartly,
        last,
      ];
    },
  },
});

export const {
  intializeStates,
  setStateTrades,
  sortBy,
  setStateTradesPartly,
  setProducts,
} = tradesSlice.actions;
export default tradesSlice.reducer;
