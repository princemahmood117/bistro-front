import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('')

  const [clientSecret,setClientSecret] = useState('')

  const axiosSecure = useAxiosSecure()

  const [cart] = useCart()
  const {user} = useAuth()

  const totalPrice = cart.reduce((total,item)=>total + item.price ,0)

  useEffect(()=> {
    axiosSecure.post('/create-payment-intent', {price: totalPrice})
    .then(res=> {

        setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure,totalPrice])

  const handleSubmit = async(e) => {
    e.preventDefault();

// stripe or elements না থাকলে রিটার্ন করে দিবো কারন কার্ডের ইনফরমেশন পাই নি
    if(!stripe || !elements) {
        return;
    }

    const card = elements.getElement(CardElement)

    if(card === null) {
        return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type : 'card',
        card
    })

    if(error) {
     
        setError(error.message)
    }
    else {
       
        setError('')
    }

    // confirm payment

    const {} = stripe.confirmCardPayment(clientSecret, {
      payment_method  : {
        card : card,
        billing_details : {
          name : user.email || 'annonymous',
          name : user.displayName || 'annonymous'
        }
      }
    })

  };




  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        ></CardElement>

            <div className="flex justify-center">
            <button className="mt-6 btn btn-sm btn-primary" type="submit"  disabled={!stripe || !clientSecret}>Pay</button>
            </div>

            <div>
                {
                    error && <p className="text-red-500">{error}</p>
                }
            </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
