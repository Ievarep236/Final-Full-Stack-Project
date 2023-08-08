import {
  Dialog,
  DialogContent,
  TextField,
  Stack,
  Button,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const AddCustomerDialog = ({ errorState, open, onClose, onSave, loading }) => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [updatedErrorState, setUpdatedErrorState] = useState(errorState);

  useEffect(() => {
    if (errorState != null) setUpdatedErrorState(errorState);
  }, [errorState]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <TextField
            fullWidth
            label="Name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DatePicker
            label="Date of birth"
            value={date_of_birth}
            disabled={loading}
            onChange={(value) => setDateOfBirth(value)}
          />
        </Stack>
      </DialogContent>
      {updatedErrorState && (
        <Typography color="#FF0000" textAlign={"center"}>
          There's an error in the form
        </Typography>
      )}
      <DialogActions>
        <Stack pt={2} spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              onSave({
                full_name,
                email,
                date_of_birth: date_of_birth.toISOString().substring(0, 10),
              });
              setFullName("");
              setEmail("");
              setDateOfBirth("");
            }}
          >
            Add
          </Button>
          <Button
            variant="text"
            onClick={() => {
              onClose();
              setFullName("");
              setEmail("");
              setDateOfBirth("");
            }}
          >
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerDialog;
