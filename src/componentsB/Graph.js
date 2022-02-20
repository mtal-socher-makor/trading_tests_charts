import React, { useState, useEffect } from 'react'
import VizArea from '../componentsB/VizArea'
const Graph = ({ stateTrades }) => {
  const [value, setValue] = useState()
  const [mkt, setMkt] = useState([])
  const [rfq, setRfq] = useState([])
  const [fok, setFok] = useState([])
  useEffect(() => {
    if (value === 'TYPE') {
      let filteredMkt = stateTrades.filter((t) => t.data.type === 'MKT')
      setMkt([...filteredMkt])
    }
  }, [value])
  return (
    <div>
      <VizArea type='C' data={stateTrades} value={value} setValue={setValue} /> {/* { stateTrades.length && <DataCircle  d={ stateTrades[stateTrades -1]} /> } */}
    </div>
  )
}

export default Graph
