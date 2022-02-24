import { FilterSharp } from '@material-ui/icons'
import { scaleOrdinal } from 'd3'
const createDataArrays = (dataStates, groupBy, filters) => {
  let colorsPalette = ['#4deeea', '#e6054a', '#f000ff', '#ff0c12', '#e92098', '#74ee15', '#ffae1d', '#2aff60', '#fffe00', '#00feff', '#00fdd6', '##00baff', '#a93fec', '#ff38b6', '#ffea00', '#39ff14']

  const [stateTrades, stateTradesPartly, typeTrades, sideTrades, locationTrades, threadTrades] = dataStates
  const [groupByType, groupBySide, groupByLocation, groupByThread, allBtn] = groupBy

  let gdata = []
  if (groupByType === true) {
    gdata = typeTrades
  } else if (groupBySide === true) {
    gdata = sideTrades
  } else if (groupByLocation === true) {
    gdata = locationTrades
  } else if (groupByThread === true && filters.threads.length) {
    gdata = threadTrades
  } else if (groupByThread === true && !filters.threads.length) {
    gdata = {all:stateTrades}
  }
  let arrays = Object.values(gdata)
  let arrayNames = Object.keys(gdata)

  const colorScale = scaleOrdinal()
    .domain([...arrayNames])
    .range(colorsPalette)

  return [arrays, arrayNames, colorScale]
}

export default createDataArrays
