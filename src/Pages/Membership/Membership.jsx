import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutForm";
import HeaderTittle from "../../Components/Shared/HeaderTittle/HeaderTittle";
import HelmateTittle from "../../Components/Shared/HelmateTittle/HelmateTittle";
import { Elements } from "@stripe/react-stripe-js";



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Membership = () => {
  return (
    <div className="mt-20">
      <HelmateTittle helmetTittle={"Forum | membership | Payments"}></HelmateTittle>
      <HeaderTittle
        heading={"Please Pay to Eat"}
        tittle={"Payment"}
      ></HeaderTittle>
      <div className="w-[25rem] md:w-[30rem] mx-auto mt-20">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Membership;
