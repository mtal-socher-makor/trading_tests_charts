import ButtonBar from "./componentsB/ButtonBar";
import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import VizArea from "./componentsB/VizArea";
import GroupBy from "./componentsB/GroupBy";
import Legend from "./componentsB/d3/Legend";

import * as tradesAction from "./Redux/Trades/TradesSlice";
import { useSelector, useDispatch } from "react-redux";
import AxisLeftSvg from "./componentsB/d3/AxisLeftSvg";

function App() {
  const classes = useStyles();
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tradesAction.loginGetAllProduct());
  }, [dispatch]);

  return (
    <div className="App">
      <Grid container direction="column" className={classes.App2}>
        <Grid item xs={12}>
          <ButtonBar />
        </Grid>
        <Grid
          container
          className={classes.presentationArea}
          style={{ marginTop: 64 }}
        >
          <Grid
            item
            xs={10}
            style={{ display: "flex", justifyContent: "center" , position: "relative" }}
          >
            <GroupBy />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid
                item
                className="vizPlusLegend"
                style={{ paddingTop: "5rem" }}
              >
                {!groupBy.thread && <Legend />}
              </Grid>
              <Grid item style={{}}>
                <Grid container style={{ display: "flex", width: "inherit" }}>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <AxisLeftSvg />
                  </Grid>
                  <Grid item>{<VizArea />}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  App2: {
    width: "85vw",
    margin: "5vh auto 0 auto",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: 600,
  },
}));
