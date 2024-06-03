/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CheckoutForm.css'
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CheckoutForm = ({ contest }) => {
    const price = parseFloat(contest?.entryFee)
    const stripe = useStripe();
    const navigate = useNavigate()
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [error , setError] = useState("")
    const {user} = useAuth()
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("")
        }
        // confirm payment
        const {paymentIntent, error: confirmPaymentError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmPaymentError){
            console.log(confirmPaymentError);
        }
        else{
            if(paymentIntent.status === 'succeeded'){
                const payment = {
                    participantEmail: user?.email,
                    participantName: user?.displayName,
                    prize: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    contestId: contest?._id,
                    contestName: contest?.contestName,
                    task: contest?.taskSubmited,
                    status: 'Success'
                }
                const {data} = await axiosSecure.post('/payments', payment)
                console.log(data);
                if (data?.insertedId) {
                    navigate('/dashboard/myContest')
                    toast.success('Successfully registration complete')
                }
                
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe} className=" text-sm md:text-lg btn bg-primary hover:bg-secondary">
                Pay
            </button>
            {
                error && <p className="text-red-400 mt-2">{error?.message}</p>
            }
        </form>
    );
};

export default CheckoutForm;