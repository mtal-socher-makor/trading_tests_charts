import { FilterSharp } from '@material-ui/icons'
import { scaleOrdinal } from 'd3'
import { useSelector } from 'react-redux'

const createDataArrays = (dataStates, groupBy, filters,timesMode) => {
  let colorsPalette = ['#4deeea', '#e6054a', '#f000ff', '#ff0c12', '#e92098', '#74ee15', '#ffae1d', '#2aff60', '#fffe00', '#00feff', '#00fdd6', '#00baff', '#a93fec', '#ff38b6', '#ffea00', '#39ff14']
  let gdata = {}
  console.log("ggg",groupBy)
  if (groupBy.type) {
    console.log("ERROR")

    gdata = dataStates.typeTrades
  } else if (groupBy.side) {
    console.log("ERROR")

    gdata = dataStates.sideTrades
  } else if (groupBy.location) {
    console.log("ERROR")

    gdata = dataStates.locationTrades
  } else if (groupBy.thread && filters.threads.length && !timesMode) {
    console.log("ERROR")
    gdata = dataStates.threadTrades
  } else if (groupBy.thread && !filters.threads.length && !timesMode) {
    
    gdata = { all: dataStates.stateTrades }
  }
  else if ( timesMode) {
    console.log("IAM HEREEE")
    gdata = { all: dataStates.stateTrades }
  }
  console.log("G",gdata)
  let arrays = Object.values(gdata)
  let arrayNames = Object.keys(gdata)
  const colorScale = scaleOrdinal()
    .domain([...arrayNames])
    .range(colorsPalette)
console.log( "arrays",arrays)
  return [arrays, arrayNames, colorScale]
}

export default createDataArrays
