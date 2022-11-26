import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TooltipLabel = ({ label, contents, detail, shouldOpenDialog }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box sx={{ fontWeight: "bold" }}>{label}</Box>
        </DialogTitle>
        <DialogContent>{detail}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog ? (
        <Box onClick={() => setOpen(true)}>{contents}</Box>
      ) : (
        contents
      )}
    </>
  );
};

export default TooltipLabel;
