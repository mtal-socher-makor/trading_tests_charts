import { createSlice } from '@reduxjs/toolkit'
export const tradesSlice = createSlice({
  name: 'trades',
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
        if (key !== 'stateTradesPartly' && key !== 'stateTrades') {
          state.dataStates[key] = {}
        } else {
          state.dataStates[key] = []
        }
      })
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setStateTrades: (state, action) => {
      if (state.dataStates.stateTrades.length <= 70 ) {
        state.dataStates.stateTrades = [...state.dataStates.stateTrades, action.payload]
      } else {
        let temp = [...state.dataStates.stateTrades]
        let discardedIID = temp.shift().id; //clearing stateTrades from first trade
        state.dataStates.stateTrades = [...temp, action.payload]
        let tempPartly =  [...state.dataStates.stateTradesPartly].filter(trade => trade.id !==discardedIID) //clearing stateTradesPartly from discarded trade
        state.dataStates.stateTradesPartly = [...tempPartly]
        let tempTypeTrades = Object.entries(state.dataStates.typeTrades) //clearing typeTrades from discarded trade

        tempTypeTrades.forEach((arr, index) => {
          let newArr = arr[1].filter(trade => trade.id !== discardedIID);
          tempTypeTrades[index][1] = newArr;
        })
        state.dataStates.typeTrades = Object.fromEntries(tempTypeTrades)
        
        let tempSideTrades = Object.entries(state.dataStates.sideTrades) //clearing sideTrades from discarded trade

        tempSideTrades.forEach((arr, index) => {
          let newArr = arr[1].filter(trade => trade.id !== discardedIID);
          tempSideTrades[index][1] = newArr;
        })
        state.dataStates.sideTrades = Object.fromEntries(tempSideTrades) 
      

      let tempLocationTrades = Object.entries(state.dataStates.locationTrades) //clearing locationTrades from discarded trade

        tempLocationTrades.forEach((arr, index) => {
          let newArr = arr[1].filter(trade => trade.id !== discardedIID);
          tempLocationTrades[index][1] = newArr;
        })
        state.dataStates.locationTrades = Object.fromEntries(tempLocationTrades) 

      let tempThreadTrades = Object.entries(state.dataStates.threadTrades) //clearing locationTrades from discarded trade

      tempThreadTrades.forEach((arr, index) => {
        let newArr = arr[1].filter(trade => trade.id !== discardedIID);
        tempThreadTrades[index][1] = newArr;
      })
      state.dataStates.threadTrades = Object.fromEntries(tempThreadTrades) 
      
      }
    },
    // emptyTrades: (state,action) => {  //action represents the trade that should be removed

    // },
    sortBy: (state, action) => {
      let givenGroup = action.payload // type - side - thread - location
      if (state.dataStates.stateTrades.length > 0) {
        let key = state.dataStates.stateTrades[state.dataStates.stateTrades.length - 1][givenGroup] // mkt - fok - sell -buy the givengrouup of the last trade

        if (givenGroup === 'thread') {
          key = key.toString()
        }
        let section = `${givenGroup}Trades` // the local trades coresponds to the given group
        state.dataStates[section] = {
          ...state.dataStates[section],
          [key]: state.dataStates[section][key]
            ? [...state.dataStates[section]?.[key], state.dataStates.stateTrades[state.dataStates.stateTrades.length - 1]]
            : [state.dataStates.stateTrades[state.dataStates.stateTrades.length - 1]],
        }
      }
    },
    setStateTradesPartly: (state, action) => {
      let last = state.dataStates.stateTrades[state.dataStates.stateTrades.length - 1];
      state.dataStates.stateTradesPartly = [...state.dataStates.stateTradesPartly, last]

      // if (state.dataStates.stateTrades.length <= 10) {
      //   state.dataStates.stateTradesPartly = [...state.dataStates.stateTradesPartly, last]
      // } else {
      //   state.dataStates.stateTradesPartly.shift()
      //   state.dataStates.stateTrades = [...state.dataStates.stateTradesPartly, last]
      // }
    },
  },
})

export const { intializeStates, setStateTrades, sortBy, setStateTradesPartly, setProducts } = tradesSlice.actions
export default tradesSlice.reducer
