import { useStyles } from '../../styles/mainStyles'
import { useSelector } from 'react-redux'


const shortify = (str) => {
  if(str.length > 40){
    return `${str.substring(0, 39)}...`
  }else{
    return str
  }
}

function Tooltip({ x, y, d }) {
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const classes = useStyles()

  return (
    <>
      <rect
        x={x}
        rx='5'
        y={y}
        fill='var(--secondary)'
        width={250}
        height={80 + Object.keys(d.response).length*12}
        //style={{zIndex: 2}}
        className={classes.tooltipBox}
      ></rect>
      <text x={x + 10} y={y + 20} fill='var(--main)' style={{ zIndex: 2 }} className={classes.tooltipBox} textAnchor='middle'>
        <tspan className={classes.tspanTitle} x={x + 125} y={y + 12}>
          {d.product_name}{' '}
        </tspan>
        <tspan className={classes.tspan} x={x + 125} y={y + 24}>
          {d.type}{' '}
        </tspan>
        <tspan className={classes.tspan} x={x + 125} y={y + 36}>
          {d.side}{' '}
        </tspan>
        {!mode && (
          <tspan className={classes.tspan} x={x + 125} y={y + 48}>
            {' '}
            QTY : {d.quantity}{' '}
          </tspan>
        )}
         {Object.entries(d.response).map(([key, value], i) => (
           <tspan className={classes.tspan} x={x + 125} y={y + 60 + i*12}>
           {key} : {shortify(value)}
          </tspan>
         ))}
     {console.log(d.response)}
      </text>
    </>
  )
}

export default Tooltip
