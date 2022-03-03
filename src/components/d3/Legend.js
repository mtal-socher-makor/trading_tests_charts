import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { scaleOrdinal } from 'd3';

import { useDispatch, useSelector } from 'react-redux';
import createDataArrays from '../../helperFunctions/createDataArrays';

function Legend() {
  const dispatch = useDispatch();

  const dataStates = useSelector((state) => state.trades?.dataStates);
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping);
  const filters = useSelector((state) => state.groupingAndFilters?.filters);
  const [arrays, arrayNames, colorScale] = createDataArrays(dataStates, groupBy, filters);

  return (
    <>
      <Grid container direction="column">
        {arrayNames?.length ?
          arrayNames.map((name, index) => (
            <Grid
              item
              style={{
                borderBottom: `3px solid ${colorScale(arrayNames[index])}`,
              }}
            >
              <Typography style={{ fontWeight: 'bold', color: '#dfe1e6' }}>{name}</Typography>
            </Grid>
          )) : null }
      </Grid>
    </>
  );
}

export default Legend;
