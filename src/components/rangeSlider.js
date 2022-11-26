import { Tooltip, Typography, Switch, Grid, Box, Slider } from "@mui/material";

const RangeSlider = ({
  label,
  range,
  setRange,
  min,
  max,
  step = 1,
  isEnabled,
  setEnabled,
  formatLeftBound,
  formatRightBound,
  info,
  mb = 0,
  width = 300,
}) => {
  const leftBound = formatLeftBound ? formatLeftBound(range[0]) : range[0];
  const rightBound = formatRightBound ? formatRightBound(range[1]) : range[1];
  const detail =
    leftBound === rightBound ? leftBound : `${leftBound} - ${rightBound}`;
  return (
    <Box sx={{ width, mb }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography mb={2} variant="h6">
            <Tooltip title={info}>
              <Box
                sx={{
                  fontWeight: "bold",
                  display: "inline",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: "5px",
                  cursor: "pointer",
                }}
              >
                {label}
              </Box>
            </Tooltip>
            {isEnabled && `: ${detail}`}
          </Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={isEnabled}
            onChange={(event) => setEnabled(event.target.checked)}
          />
        </Grid>
      </Grid>
      {isEnabled && (
        <Box sx={{ width: 0.9 * width }} ml={1}>
          <Slider
            value={range}
            onChange={(_, newValue) => setRange(newValue)}
            min={min}
            max={max}
            step={step}
          />
        </Box>
      )}
    </Box>
  );
};

export default RangeSlider;
