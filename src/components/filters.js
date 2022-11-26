import { Box } from "@mui/material";

import RangeSlider from "./rangeSlider";
import Dropdown from "./dropdown";

const Filters = ({ filters, width, dialogTooltips = false }) => (
  <Box>
    {filters.map((filter) => {
      switch (filter.type) {
        case "range":
          return (
            <RangeSlider
              key={filter.label}
              label={filter.label}
              range={filter.range}
              setRange={filter.setRange}
              min={filter.min}
              max={filter.max}
              step={filter.step}
              isEnabled={filter.isEnabled}
              setEnabled={filter.setEnabled}
              formatLeftBound={filter.formatLeftBound}
              formatRightBound={filter.formatRightBound}
              info={filter.info}
              mb={4}
              width={width}
              dialogTooltips={dialogTooltips}
            />
          );
        case "dropdown":
          return (
            <Dropdown
              key={filter.label}
              label={filter.label}
              value={filter.value}
              setValue={filter.setValue}
              options={filter.options}
              isEnabled={filter.isEnabled}
              setEnabled={filter.setEnabled}
              info={filter.info}
              mb={4}
              width={width}
              dialogTooltips={dialogTooltips}
            />
          );
        default:
          return null;
      }
    })}
  </Box>
);

export default Filters;
