import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  const price = 50;
  const [clientSecret, setClientSecret] = useState("");

  
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosPublic.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res?.data?.clientSecret);
    });
  }, [axiosPublic, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Opps!", error.code, "error");
    } 

    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "anonymous@example.com",
          },
        },
      }
    );

    if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {

        axiosPublic.patch(`/users/membership/${user.email}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Update!",
              text: `( ${user.displayName} ) is Gold Member Now`,
              icon: "success",
            });
          }
        });
      }
    } else {
      Swal.fire("Opps!", cardError.code, "error");
    }
  };

  return (
    <form className="border-2 p-20 border-blue-600" onSubmit={handleSubmit}>
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div>
        <button
          className="btn w-full bg-blue-700 text-white mt-20"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay 50$
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
