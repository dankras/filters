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
  showAttractivenessFAQ,
}) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [attractivenessFAQOpen, setAttractivenessFAQopen] = useState(false);
  const result = numerator / denominator;
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
          {result < 0.005 ? "<0.5%" : formatFloatToPercent(result)}
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
      {showAttractivenessFAQ && (
        <Grid item mt={4}>
          <Dialog
            open={attractivenessFAQOpen}
            onClose={() => setAttractivenessFAQopen(false)}
          >
            <DialogTitle>
              <Box sx={{ fontWeight: "bold" }}>FAQ</Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Why are there so few attractive people?</strong>
              </DialogContentText>
              <DialogContentText mt={2}>
                Women rate most men as below average in physical attractiveness.
                The median man receives a 4.1 out of 10 rating. (This finding
                has been replicated a number of times, e.g. see{" "}
                <a
                  href="https://i.imgur.com/L9Vu4Zo.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OKCupid's data
                </a>
                .)
              </DialogContentText>
              <Box mt={2} display="flex" justifyContent="center">
                <img
                  src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F697f8957-ed79-48a3-b7b5-d35269cfa267_359x379.png"
                  alt="Women Ratings"
                />
              </Box>
              <DialogContentText mt={2}>
                Men rate women along a fairly normal distribution, with the
                median woman receiving a 5.0 out of 10 rating (i.e. men
                perceived the median woman to be average looking).
              </DialogContentText>
              <DialogContentText mt={2}>
                However, the number of women that are rated 8 out of 10 or
                higher in this sample is fairly small, and may underrepresent
                the number of attractive single women in the broader population.
                (OKCupid's data suggests that the proportion of "most
                attractive" women should be roughly equal to the proportion of
                "least attractive" women.)
              </DialogContentText>
              <Box mt={2} display="flex" justifyContent="center">
                <img
                  src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe7a24fb0-a301-4700-99c9-7160836dc42b_359x379.png"
                  alt="Women Ratings"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAttractivenessFAQopen(false)}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Typography
            component="a"
            href="#"
            onClick={() => setAttractivenessFAQopen(true)}
          >
            <Box style={{ fontStyle: "italic", fontSize: 14 }}>
              <strong>FAQ:</strong> Why are there so few attractive people?
            </Box>
          </Typography>
        </Grid>
      )}
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
