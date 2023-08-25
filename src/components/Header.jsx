import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>

        <input type="text" placeholder="Rechercher des articles" />
        {token ? (
          <button
            className="disconnect"
            onClick={() => {
              Cookies.remove("token");
              setToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="sign-connect">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
