import { useStyles } from '../../styles/mainStyles'
import { useSelector } from 'react-redux'

function Tooltip({ x, y, d }) {
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const classes = useStyles()

  return (
    <>
      <rect
        x={x}
        rx='5'
        y={y}
        fill='#6e6b6b'
        width={100}
        height={140}
        //style={{zIndex: 2}}
        className={classes.tooltipBox}
      ></rect>
      <text x={x + 10} y={y + 20} fill='#fff' style={{ zIndex: 2 }} className={classes.tooltipBox} textAnchor='middle'>
        <tspan className={classes.tspanTitle} x={x + 50} y={y + 20}>
          {d.product_name}{' '}
        </tspan>
        <tspan className={classes.tspan} x={x + 50} y={y + 40}>
          {d.type}{' '}
        </tspan>
        <tspan className={classes.tspan} x={x + 50} y={y + 60}>
          {d.side}{' '}
        </tspan>
        {!mode && (
          <tspan className={classes.tspan} x={x + 50} y={y + 80}>
            {' '}
            QTY : {d.quantity}{' '}
          </tspan>
        )}
        {d.status !== 200  && (
          <tspan className={classes.tspan} x={x + 50} y={y + 100} fill= "#a80505">
            {' '}
            ERR : {d.status}{' '}
          </tspan>
        )}
      </text>
    </>
  )
}

export default Tooltip
