import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  // State qui gère mes input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event, setChange) => {
    setErrorMessage("");
    setChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);
      handleToken(response.data.token, response.data._id);
      navigate("/");
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data.message === "User not found") {
        setErrorMessage("Connexion non autorisé");
      } else if (error.response.data.error === "Unauthorized") {
        setErrorMessage("Connexion non autorisé");
      }
    }
  };

  return (
    <form
      className="log-sign"
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
