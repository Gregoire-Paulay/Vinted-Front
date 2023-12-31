import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import Loader
import ClipLoader from "react-spinners/ClipLoader";

// Import d'image
import hero from "../assets/hero.jpeg";

const Home = ({ search, fetchRangeValues, sort }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${
            fetchRangeValues[0]
          }&priceMax=${fetchRangeValues[1]}&sort=${
            sort ? "price-desc" : "price-asc"
          }`
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
  }, [search, fetchRangeValues, sort]);

  return isLoading ? (
    <div className="loader">
      <ClipLoader
        color="#0d7580"
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <main>
      <section className="hero">
        <img src={hero} alt="bandeau vinted" />

        <div>
          <h1>Prêts à faire du tri dans vos placards?</h1>
          <button
            onClick={() => {
              navigate("/publish");
            }}
            className="hero-button"
          >
            Commencer à vendre
          </button>
        </div>
      </section>

      <section className="container">
        <div className="allOffer">
          {data.offers.map((offer) => {
            return (
              <article
                key={offer._id}
                onClick={() => navigate("/offer/" + offer._id)}
              >
                {/* Info de l'user qui à créer l'offre */}
                <div>
                  {offer.owner.account.avatar ? (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt={offer.owner.account.username}
                    />
                  ) : (
                    ""
                  )}
                  <p>{offer.owner.account.username}</p>
                </div>

                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
                {/* Info sur le prix, taille et marque de l'offre*/}
                <p>{offer.product_price} €</p>
                {offer.product_details.map((detail, index) => {
                  if (detail.MARQUE || detail.TAILLE) {
                    return <p key={index}>{detail.MARQUE || detail.TAILLE}</p>;
                  } else {
                    return null;
                  }
                })}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
