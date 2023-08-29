import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import Cookies from "js-cookie";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe(); // requête vers stripe pour lui envoyer les codes
  const elements = useElements(); // Récupérer les données bancaires de l'utilisateur

  const [paymentDone, setPaymentdone] = useState(false); // savoir si le paiement est validé
  const [isPaying, setIsPaying] = useState(false); // Savoir si le paiement en cours

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsPaying(true);
      const cardElement = elements.getElement(CardElement); // Récupérer le contenue de Cardelement

      const stripeResponse = await stripe.createToken(cardElement, {
        name: Cookies.get("id"),
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { stripeToken: stripeToken }
      );
      console.log(response.data);

      setIsPaying(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {!paymentDone ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={isPaying}>
            Valider
          </button>
        </form>
      ) : (
        <span>Paiement effectué</span>
      )}
    </>
  );
};

export default CheckoutForm;
