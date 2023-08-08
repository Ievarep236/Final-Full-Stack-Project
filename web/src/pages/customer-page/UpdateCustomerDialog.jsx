import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";

import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useEffect } from "react";

const UpdateCustomerDialos = ({
  id,
  name,
  email,
  birthday,
  errorState,
  open,
  onClose,
  onSave,
}) => {
  const [updatedName, setName] = useState(name);
  const [updatedId, setId] = useState(id);
  const [updatedEmail, setEmail] = useState(email);
  const [updateBirthday, setupdateBirthday] = React.useState(dayjs(birthday));
  const [updatedErrorState, setUpdatedErrorState] = useState(errorState);

  const updateNameAgain = () => setName(name);
  const updateEmailAgain = () => setEmail(email);
  const updateBirthdayAgain = () => setupdateBirthday(dayjs(birthday));

  useEffect(() => {
    if (name != null) setName(name);
  }, [name]);

  useEffect(() => {
    if (email != null) setEmail(email);
  }, [email]);

  useEffect(() => {
    if (birthday != null) setupdateBirthday(dayjs(birthday));
  }, [birthday]);

  useEffect(() => {
    if (id != null) setId(id);
  }, [id]);

  useEffect(() => {
    if (errorState != null) setUpdatedErrorState(errorState);
  }, [errorState]);

  const newValuefix = (body) => {
    setValue(body);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update {name}</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <TextField
            label={name}
            value={updatedName}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            type="email"
            label={email}
            value={updatedEmail}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label={"Date of Birth"}
                value={updateBirthday}
                onChange={(e) => setupdateBirthday(e)}
              />
            </DemoContainer>
          </LocalizationProvider>
          {updatedErrorState && (
            <Typography color="#FF0000" textAlign={"center"}>
              There's an error in the form
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            onSave(
              {
                updatedName,
                updatedEmail,
                updateBirthday: updateBirthday.toISOString().substring(0, 10),
              },
              { updatedId }
            );
          }}
        >
          Save Changes
        </Button>
        <Button
          onClick={() => {
            updateNameAgain();
            updateEmailAgain();
            updateBirthdayAgain();
            onClose();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCustomerDialos;
