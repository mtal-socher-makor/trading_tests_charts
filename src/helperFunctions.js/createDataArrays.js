import {  scaleOrdinal } from 'd3'

const createDataArrays = (dataStates, groupBy) => {

  const [stateTrades, stateTradesPartly, typeTrades, sideTrades, locationTrades] = dataStates
  const [groupByType, groupBySide, groupByLocation] = groupBy
  let gdata = []
  if (groupByType === true) {
    console.log('here')
    gdata = typeTrades
  } else if (groupBySide === true) {
    gdata = sideTrades
  } else if (groupByLocation === true) {
    gdata = locationTrades
  }
  let arrays = Object.values(gdata)
   let arrayNames = Object.keys(gdata)
  //let arrayNames = ['FOK', 'MKT', 'RFQ']
  const colorScale = scaleOrdinal()
    .domain([...arrayNames])
    .range(['#e41a1c', '#ffff33', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
  console.log('arrays', arrays)

  return [arrays, arrayNames, colorScale];
}

export default createDataArrays;