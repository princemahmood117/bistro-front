import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


// কম্পোনেন্ট এর বাহিরে stripe-Promise (publishable key) ডিক্লেয়ার করতে হবে
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Publishable_Key)

const Payment = () => {
    return (
        <div>

            <SectionTitle heading={'Payment'} subHeading={'---Please pay first---'}></SectionTitle>
            

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
            
        </div>
    );
};

export default Payment;