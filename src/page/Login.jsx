import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (event, setChange) => {
    setChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 15 });
      navigate("/");
      setToken(token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <h2>Se connecter</h2>

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(event) => {
          handleChange(event, setEmail);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(event) => {
          handleChange(event, setPassword);
        }}
      />
      <button type="submit">Se connecter</button>
      <p
        onClick={() => {
          navigate("/signup");
        }}
      >
        Pas encore de compte ? Inscris-toi !
      </p>
    </form>
  );
};

export default Login;
