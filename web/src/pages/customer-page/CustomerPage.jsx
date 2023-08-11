import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCustomerDialog from "./AddCustomerDialog";
import {
  deleteClient,
  getClients,
  patchClient,
  postClients,
} from "../../../api";
import UpdateCustomerDialos from "./UpdateCustomerDialog";
import { StyledDiv } from "../register-page/ReisterPage.style";

const CustomerPage = () => {
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogClose = () => {
    setErrorTextAdd(false), setIsDialogOpen(false);
  };

  const checkToken = () => {
    if (!token) {
      navigate("/");
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const [clientList, setClientList] = useState([]);

  const fetchClientList = async (token) => {
    try {
      const { data } = await getClients(token);
      setClientList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClient = async (id, token) => {
    try {
      await deleteClient(id, token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewClient = async (body) => {
    try {
      console.log(body);
      const responce = await postClients(
        {
          full_name: body.full_name,
          email: body.email,
          date_of_birth: body.date_of_birth,
        },
        token
      );

      setErrorTextAdd(false);
      setIsDialogOpen(false);
    } catch (err) {
      setErrorTextAdd(true);
      console.log(err);
    }
  };

  const handleUpdate = async (body, id) => {
    console.log(body);
    const update = {
      full_name: body.updatedName,
      email: body.updatedEmail,
      date_of_birth: body.updateBirthday,
    };
    console.log(update, id.updatedId, token);
    try {
      const responce = await patchClient(update, id.updatedId, token);
      if (responce) {
        setUpdateDialogOpen(false);
      }
      console.log(responce);
      setErrorText(false);
    } catch (err) {
      setErrorText(true);
      console.log(err);
    }
  };

  useEffect(() => {
    checkToken();
    fetchClientList(token);
  });

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false), setErrorText(false);
  };
  const [currentlyUpdatingid, setCurrentlyUpdatingid] = useState();
  const [currentlyUpdatingClient, setCurrentlyUpdatingClient] = useState();
  const [currentlyUpdatingemail, setCurrentlyUpdatingEmail] = useState();
  const [currentlyUpdatingBirthday, setCurrentlyUpdatingBirthday] = useState();
  const [errorText, setErrorText] = useState(false);
  const [errorTextAdd, setErrorTextAdd] = useState(false);

  const card = (data) => {
    return (
      <>
        <Stack
          direction="row"
          sx={{
            width: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "15px",
          }}
        >
          <Stack>
            <CardContent>
              <Typography variant="h6"> {data.full_name}</Typography>
              <Typography> {data.email}</Typography>
              <Typography>
                {new Date(data.date_of_birth).toISOString().substring(0, 10)}
              </Typography>
            </CardContent>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "15px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setCurrentlyUpdatingid(data.id);
                setCurrentlyUpdatingClient(data.full_name);
                setCurrentlyUpdatingEmail(data.email);
                setCurrentlyUpdatingBirthday(
                  data.date_of_birth.substring(0, 10)
                );
                setUpdateDialogOpen(true);
              }}
            >
              Update
            </Button>
            <Button
              variant="text"
              onClick={() => handleDeleteClient(data.id, token)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </>
    );
  };

  return (
    <div>
      <StyledDiv>
        <h1>Customer Page</h1>
      </StyledDiv>
      <Stack
        pt={2}
        spacing={2}
        direction="row"
        sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          Add customer
        </Button>
        <Button onClick={() => logOut()}>Log out</Button>
      </Stack>
      <Stack pt={2} spacing={2} sx={{ display: "flex", alignItems: "center" }}>
        {clientList.map((client) => (
          <Card
            key={client.id}
            direction="row"
            variant="outlined"
            sx={{ maxWidth: 400, display: "flex", alignItems: "center" }}
          >
            {card(client)}
          </Card>
        ))}
      </Stack>
      <Stack pt={2} spacing={2}></Stack>
      <UpdateCustomerDialos
        id={currentlyUpdatingid}
        name={currentlyUpdatingClient}
        email={currentlyUpdatingemail}
        birthday={currentlyUpdatingBirthday}
        errorState={errorText}
        open={isUpdateDialogOpen}
        onClose={closeUpdateDialog}
        onSave={handleUpdate}
      ></UpdateCustomerDialos>
      <AddCustomerDialog
        errorState={errorTextAdd}
        open={isDialogOpen}
        onClose={onDialogClose}
        onSave={handleNewClient}
      />
    </div>
  );
};

export default CustomerPage;
