import {
  Box,
  Divider,
  Drawer,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import Filters from "./filters";

const DRAWER_WIDTH = 340;

const LargeScreenLayout = ({
  areFiltersOpen,
  setFiltersOpen,
  denominatorComponent,
  filtersConfig,
  resultsComponent,
}) => (
  <Box display="flex">
    <Box sx={{ width: areFiltersOpen ? DRAWER_WIDTH : 0 }}>
      <Drawer
        anchor="left"
        variant="persistent"
        open={areFiltersOpen}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        <Box my={3} mx={2}>
          <Grid container mb={2} justifyContent="space-between">
            <Typography variant="h5" display="inline">
              <Box sx={{ fontWeight: "bold", display: "inline" }}>Filters</Box>
            </Typography>
            <IconButton
              onClick={() => setFiltersOpen(false)}
              size="large"
              sx={{ marginTop: "-8px" }}
            >
              <ChevronLeft />
            </IconButton>
          </Grid>
          <Divider />
          <Box mt={3}>
            {denominatorComponent}
            <Filters filters={filtersConfig} />
          </Box>
        </Box>
      </Drawer>
    </Box>
    <Box
      sx={{
        width: areFiltersOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {resultsComponent}
      </Grid>
    </Box>
  </Box>
);

export default LargeScreenLayout;
