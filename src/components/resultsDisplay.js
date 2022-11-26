import { Grid, Tooltip, Typography } from "@mui/material";

import { formatFloatToPercent } from "../utils";

const ResultsDisplay = ({
  numerator,
  denominator,
  denominatorLabel,
  numeratorLabel,
  toggleFilters,
  toggleDenominators,
  margin = 0,
  width,
}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      m={margin}
      sx={{ maxWidth: width }}
      textAlign="center"
    >
      <Grid item>
        <Typography variant="h1">
          {formatFloatToPercent(numerator / denominator)}
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Tap to Configure Population">
          <Typography
            variant="h4"
            onClick={toggleDenominators}
            sx={{
              textDecoration: "underline",
              textDecorationColor: "blue",
              textDecorationStyle: "dotted",
              textUnderlineOffset: "10px",
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            {denominatorLabel}
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Tap to Configure Filters">
          <Typography
            variant="h4"
            onClick={toggleFilters}
            sx={{
              textDecoration: "underline",
              textDecorationColor: "red",
              textDecorationStyle: "dotted",
              textUnderlineOffset: "10px",
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            {numeratorLabel}
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ResultsDisplay;
