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
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // eslint-disable-next-line no-unused-vars
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error)
            setLoading(false)
        } else {
            setError("")
            setLoading(false)
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
            setError(confirmPaymentError)
            setError(false)
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
                if (data?.insertedId) {
                    setLoading(false)
                    setError('')
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
            <button type="submit" disabled={!stripe || !elements || !clientSecret || loading} className=" text-sm md:text-lg btn bg-primary hover:bg-secondary disabled:cursor-not-allowed">
                Pay
            </button>
            {
                error && <p className="text-red-400 mt-2">{error?.message}</p>
            }
        </form>
    );
};

export default CheckoutForm;