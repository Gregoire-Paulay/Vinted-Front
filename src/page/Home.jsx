import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import d'image
import hero from "../assets/hero.jpeg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers/"
        );
        const allArticles = response.data;
        // console.log(allArticles);
        setData(allArticles);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement ... </span>
  ) : (
    <main>
      <section className="hero">
        <img src={hero} alt="bandeau vinted" />
        <div>
          <h1>Prêts à faire du tri dans vos placards?</h1>
          <button>Commencer à vendre</button>
        </div>
      </section>

      <section className="container">
        <div className="allOffer">
          {data.offers.map((offer) => {
            return (
              <Link
                key={offer._id}
                to={"/offer/" + offer._id}
                className="offer"
              >
                <p>{offer.owner.account.username}</p>
                {/* {offer.owner.account.avatar.secure_url ? (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt="Avatar user"
                />
              ) : (
                ""
              )} */}

                <img src={offer.product_image.secure_url} alt="Image Offre" />
                <p>{offer.product_price} €</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
