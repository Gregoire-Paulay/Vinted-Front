import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/ChekoutForms";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const location = useLocation();
  // console.log(location);
  const { title, price } = location.state;

  const protectFee = 0.5;
  const shippingFee = 2.5;
  const total = protectFee + shippingFee + price;

  return token ? (
    <section className="payment-page">
      <div className="smallcontainer">
        <div className="payment">
          <section>
            <p>Résumé de la commande</p>
            <div>
              <p>Commande</p>
              <p>{price} €</p>
            </div>
            <div>
              <p>Frais protection acheteurs</p>
              <p>{protectFee.toFixed(2)} €</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>{shippingFee.toFixed(2)} €</p>
            </div>
          </section>

          <section>
            <div>
              <p>Total</p>
              <p>{total} €</p>
            </div>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir {title}. Cela
              vous coûtera {total} € (frais de protection et frais de port
              inclus)
            </p>

            <Elements stripe={stripePromise}>
              <CheckoutForm title={title} price={price} />
            </Elements>
          </section>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
  );
};
export default Payment;
