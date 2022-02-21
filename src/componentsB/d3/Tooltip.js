
import {useStyles } from "../../styles/mainStyles";



function Tooltip({x, y, d}) {

    const classes = useStyles();

  return (
    <>
        <rect 
            x={x} 
            rx="5"
            y={y}
            fill="var(--secondary)"
            width= {100}
            height={100}
            //style={{zIndex: 2}}
            className={classes.tooltipBox}
            >
        </rect>
        <text  
            x={x + 10} 
            y={y + 20} 
            fill="var(--main)"
            style={{zIndex: 2}}
            className={classes.tooltipBox}
            textAnchor="middle"         
        >
            <tspan className={classes.tspanTitle} x={x + 50} y={y + 20}>{d.product_name} </tspan>
            <tspan className={classes.tspan} x={x + 50} y={y + 40}>{d.type} </tspan>
            <tspan className={classes.tspan} x={x + 50} y={y + 60}>{d.side} </tspan>
            <tspan className={classes.tspan} x={x + 50} y={y + 80}> QTY : {d.quantity} </tspan>
        </text>
    </>
  )
}

export default Tooltip