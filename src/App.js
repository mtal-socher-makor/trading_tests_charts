import ButtonBar from "./componentsB/ButtonBar";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import VizArea from "./components/VizArea";
import GroupBy from "./components/GroupBy";
import Legend from "./components/d3/Legend";

import * as tradesAction from "./Redux/Trades/TradesSlice";
import { useSelector, useDispatch } from "react-redux";
import AxisLeftSvg from "./componentsB/d3/AxisLeftSvg";
import ErrorLogger from "./componentsB/ErrorLogger";

function App() {
  const classes = useStyles();
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tradesAction.loginGetAllProduct());
  }, [dispatch]);

  // const onErrorAdded = () => {
  //   if ("height is bigger than window") {
  //     element.scrollTop = element.scrollHeight;
  //   }
  // };
  return (
    <div className="App">
      <Grid container direction="column" className={classes.App2}>
        <Grid item xs={12}>
          <ButtonBar />
        </Grid>
        <Grid item>
          <Grid container style={{ gap: "1rem" }}>
            <Grid item>
              <Grid
                container
                direction="column"
                className={classes.presentationArea}
                style={{ marginTop: 64 }}
              >
                <Grid
                  item
                  xs={10}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
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
                      <Grid
                        container
                        style={{ display: "flex", width: "inherit" }}
                      >
                        <Grid
                          item
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <AxisLeftSvg />
                        </Grid>
                        <Grid item>{<VizArea />}</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                flex: 1,
                minWidth: 290,
                borderLeft: "5px solid rgb(60,60,60)",
                padding: "2rem 0 ",
                margin: '0 1rem',
                rowGap: "15px",
              }}
            >
             <ErrorLogger />
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
    // width: "95vw",
    // margin: "5vh auto 0 auto",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: 600,
  },
}));
