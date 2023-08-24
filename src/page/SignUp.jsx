import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert("success");
    // lors du submit on veut envoyez les infos à notre API et si la requête est valide on veut récupérer le token de l'utilisateur et le sauvegardez dans les cookies
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>S'inscrire</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div>
        <input type="checkbox" name="newsletter" />
        <p>S'inscrire à notre Newsletter</p>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>

      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignUp;
