import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Typography, Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Filters from "./filters";

const DRAWER_BLEEDING = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[500] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SmallScreenLayout({
  areFiltersOpen,
  setFiltersOpen,
  denominatorComponent,
  filtersConfig,
  resultsComponent,
}) {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Box>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${DRAWER_BLEEDING}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box mt={5} pb={20}>
        {denominatorComponent}
        {resultsComponent}
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={areFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        onOpen={() => setFiltersOpen(true)}
        swipeAreaWidth={DRAWER_BLEEDING}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -DRAWER_BLEEDING,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography variant="h6" sx={{ p: 2, textAlign: "center" }}>
            <Box sx={{ fontWeight: "bold" }}>Filters</Box>
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            py: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              overflow: "auto",
            }}
          >
            <Filters filters={filtersConfig} width={350} dialogTooltips />
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Box>
  );
}

export default SmallScreenLayout;
