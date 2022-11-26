import {
  Tooltip,
  Typography,
  Select,
  MenuItem,
  Switch,
  Grid,
  Box,
} from "@mui/material";

import TooltipLabel from "./tooltipLabel";

const Dropdown = ({
  label,
  value,
  setValue,
  options,
  isEnabled,
  setEnabled,
  info,
  mb = 0,
  width = 300,
  dialogTooltips = false,
}) => (
  <Box sx={{ width, mb }}>
    <Grid container justifyContent="space-between">
      <Grid item>
        <TooltipLabel
          label={label}
          detail={info}
          shouldOpenDialog={dialogTooltips}
          contents={
            <Tooltip title={info}>
              <Typography
                mb={2}
                variant="h6"
                sx={{
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: "5px",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ fontWeight: "bold" }}>{label}</Box>
              </Typography>
            </Tooltip>
          }
        />
      </Grid>
      <Grid item>
        <Switch
          checked={isEnabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
      </Grid>
    </Grid>

    {isEnabled && (
      <Select value={value} onChange={(event) => setValue(event.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    )}
  </Box>
);

export default Dropdown;
