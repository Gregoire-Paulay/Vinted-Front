import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, setChange) => {
    setChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // On veut envoyez les infos à notre API et si la requête est valide on veut récupérer le token de l'utilisateur et le sauvegardez dans les cookies
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log(response.data);

      // On récupère la clé token de ma requête que l'on stock dans un cookie nommée token
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <h2>S'inscrire</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        name="username"
        value={username}
        onChange={(event) => {
          handleChange(event, setUsername);
        }}
      />
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
        placeholder="Mot de passe"
        name="password"
        value={password}
        onChange={(event) => {
          handleChange(event, setPassword);
        }}
      />
      <div>
        <input
          type="checkbox"
          name="newsletter"
          checked={newsletter}
          onChange={() => {
            setNewsletter(!newsletter);
          }}
        />
        <p>S'inscrire à notre Newsletter</p>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>

      <button type="submit">S'inscrire</button>
      <p
        onClick={() => {
          navigate("/login");
        }}
      >
        Tu as déjà un compte ? connecte-toi !
      </p>
    </form>
  );
};

export default SignUp;
