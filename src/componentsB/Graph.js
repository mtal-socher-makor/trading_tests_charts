import React,{useState,useEffect} from 'react'
import VizArea from "./VizArea";

const Graph = ({ stateTrades,setStateTrades }) => {
    const [mkt,setMkt]=useState([])
    const [groupBy,setGroupBy]=useState("")
    useEffect(()=>{
        if(groupBy=='type')
        {
            let filteredMkt= stateTrades.filter((trade)=>trade.type=="MKT")
            setMkt([...filteredMkt])
            setStateTrades()
        }
    },[groupBy])
    return (
        <VizArea data={stateTrades}  />)
}

export default Graph