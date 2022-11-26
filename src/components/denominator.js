import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Filters from "./filters";

const Denominator = ({ open, setOpen, denominators }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Box sx={{ fontWeight: "bold" }}>Population Settings</Box>
      </DialogTitle>
      <DialogContent>
        <Filters filters={denominators} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Denominator;
