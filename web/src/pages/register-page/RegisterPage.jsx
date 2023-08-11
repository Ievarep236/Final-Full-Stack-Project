import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin, postRegister } from "../../../api";
import Cookies from "js-cookie";
import { StyledDiv } from "./ReisterPage.style";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const setCookies = (token) => {
    console.log(token);
    Cookies.set("token", token);
    navigate("/clients");
  };

  const handleLogin = async (body) => {
    if (body.password === repeatedPassword) {
      console.log(body);

      try {
        const responce = await postRegister({
          full_name: body.full_name,
          email: body.email,
          age: body.age,
          password: body.password,
          repeatedPassword: body.repeatedPassword,
        });
        if (responce.data.token) {
          setCookies(responce.data.token);
        } else {
          setFullName("");
          setEmail("");
          setAge("");
          setPassword("");
          setRepeatedPassword("");
        }
      } catch (err) {
        console.log(err);
        setFullName("");
        setEmail("");
        setAge("");
        setPassword("");
        setRepeatedPassword("");
        alert("bad password or email or user");
      }
    } else {
      alert("passwords dont match");
    }
  };

  return (
    <>
      <StyledDiv>
        <h1>Registratio</h1>
      </StyledDiv>
      <Stack pt={2} spacing={2}>
        <TextField
          fullWidth
          label="full_name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="number"
          label="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <TextField
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="repeat password"
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() =>
            handleLogin({ full_name, email, age, password, repeatedPassword })
          }
        >
          Register
        </Button>
      </Stack>
      <Stack>
        <Button variant="text" onClick={() => navigate(`/`)}>
          Go to Login
        </Button>
      </Stack>
    </>
  );
};

export default RegisterPage;
