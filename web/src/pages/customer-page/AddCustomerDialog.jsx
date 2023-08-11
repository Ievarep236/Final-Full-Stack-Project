import {
  Dialog,
  DialogContent,
  TextField,
  Stack,
  Button,
  DialogTitle,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const AddCustomerDialog = ({ errorState, open, onClose, onSave }) => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDateOfBirth] = useState();
  const [updatedErrorState, setUpdatedErrorState] = useState(errorState);
  console.log(date_of_birth);

  useEffect(() => {
    if (errorState != null) setUpdatedErrorState(errorState);
  }, [errorState]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">Add Customer</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2} sx={{ margin: "20px" }}>
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
            value={Date(date_of_birth).getTime}
            onChange={(value) => setDateOfBirth(value)}
          />
        </Stack>
      </DialogContent>
      {updatedErrorState && (
        <Typography color="#FF0000" textAlign={"center"}>
          There is an error in the form
        </Typography>
      )}

      <Stack
        pt={2}
        spacing={2}
        direction="row"
        sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
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
    </Dialog>
  );
};

export default AddCustomerDialog;
