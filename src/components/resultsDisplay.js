import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
  buttonOrientation,
}) => {
  const [aboutOpen, setAboutOpen] = useState(false);
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
              textDecorationColor: "#EF6F6F",
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
              textDecorationColor: "#7378F3",
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
      <Grid item mt={7}>
        <Grid container direction={buttonOrientation} spacing={2}>
          <Grid item>
            <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
              <DialogTitle>
                <Box sx={{ fontWeight: "bold" }}>About</Box>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  What percent of singles / single men / single women have the
                  characteristics you care about?
                </DialogContentText>
                <DialogContentText mt={3}>
                  Data from{" "}
                  <a
                    href="https://www.mixmosa.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mixmosa
                  </a>
                  , mostly representing singles in Austin, Dallas, San Antonio,
                  and Houston in 2021 - 2022.
                </DialogContentText>
                <DialogContentText mt={3}>
                  <a
                    href="https://github.com/dankras/mixmosa-anonymized-data"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Data
                  </a>{" "}
                  is open source.{" "}
                  <a
                    href="https://github.com/dankras/filters"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    This site
                  </a>{" "}
                  is open source.
                </DialogContentText>
                <DialogContentText mt={3}>
                  You may also be interested in:
                  <Typography mt={1} ml={2}>
                    -{" "}
                    <a
                      href="https://dkras.substack.com/p/thoughts-on-the-future-of-dating"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      On The Future of Dating
                    </a>
                  </Typography>
                  <Typography mt={2} ml={2}>
                    -{" "}
                    <a
                      href="https://dkras.substack.com/p/sex-differences-attractiveness-and"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Insights from 2,961 First Dates
                    </a>
                  </Typography>
                </DialogContentText>
                <DialogContentText mt={3}>
                  Created by{" "}
                  <a
                    href="https://twitter.com/realDanKras"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dan Kras
                  </a>
                  .
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAboutOpen(false)}>Back</Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="outlined"
              onClick={() => setAboutOpen(true)}
              fullWidth
            >
              About
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={toggleFilters} fullWidth>
              Filters
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={toggleDenominators} fullWidth>
              Population
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResultsDisplay;
