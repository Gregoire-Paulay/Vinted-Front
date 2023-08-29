import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleTokenAndId }) => {
  //  Stae pour gérer mes input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [avatar, setAvatar] = useState();

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //navigation au click après la soumission du formulaire
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
      //   Je fais disparaitre le message d'erreur
      setErrorMessage("");

      const formData = new FormData();
      formData.append("username", username);
      formData.append("avatar", avatar);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsletter);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
        // {
        //   username: username,
        //   email: email,
        //   password: password,
        //   newsletter: newsletter,
        // }
      );
      console.log(response.data);

      // On récupère la clé token de ma requête que l'on stock dans un cookie
      handleTokenAndId(response.data.token, response.data._id);
      // navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "This email already has an account") {
        // Je met à jour mon state errorMessage
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre :)"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs :)");
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
      <label htmlFor="avatar" className="avatar">
        Choisir son avatar
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        id="avatar"
        onChange={(event) => {
          // console.log(event);
          setAvatar(event.target.files[0]);
        }}
      />
      {avatar && <img src={URL.createObjectURL(avatar)} alt="Mon avatar" />}
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
