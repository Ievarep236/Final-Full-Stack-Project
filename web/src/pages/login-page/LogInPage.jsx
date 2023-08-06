import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../api";
import Cookies from "js-cookie";
const LogInPage = () => {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setCookies = (token) => {
    console.log(token);
    Cookies.set("token", token);
    navigate("/clients");
  };

  const handleLogin = async (body) => {
    try {
      const responce = await postLogin({
        full_name: body.full_name,
        email: body.email,
        password: body.password,
      });
      if (responce.data.token) {
        setCookies(responce.data.token);
      } else {
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      setFullName("");
      setEmail("");
      setPassword("");
      alert("bad password or email or user");
    }
  };

  return (
    <>
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
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => handleLogin({ full_name, email, password })}
        >
          Log in
        </Button>
      </Stack>
      <Stack>
        <Button variant="text" onClick={() => navigate(`/register`)}>
          Go to registration
        </Button>
      </Stack>
    </>
  );
};

export default LogInPage;
