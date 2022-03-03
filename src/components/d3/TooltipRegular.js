import { useSelector } from 'react-redux'
import {Grid,Typography} from "@material-ui/core";

function TooltipRegular({ x, y, d }) {

    const mode = useSelector((state) => state.groupingAndFilters?.mode)
    //const classes = useStyles()

  return (
    <Grid style={{position: "absolute", top: y, left: x}}>
        <Typography style={{color: "#fff"}}> {d.product_name}</Typography>
    </Grid>
  )
}

export default TooltipRegular