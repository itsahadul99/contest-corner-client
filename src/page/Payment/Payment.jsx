/* eslint-disable no-unused-vars */
import { loadStripe } from "@stripe/stripe-js";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
    const paymentContest = useLoaderData()
    const { contestName, participation, prize, deadline, entryFee, taskSubmited, _id } = paymentContest;
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <SectionTitle title="Payment For Joining" subTitle="Ready for the nex" />
            <Container>
                    {/* <div className=" w-full md:w-1/2 space-y-2 md:space-y-3 flex-1">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{contestName}</h1>
                        <p><span className="font-bold text-sm md:text-lg">Task: </span>{taskSubmited}</p>
                        <div className="text-sm md:text-lg font-medium">
                            <p><span className="font-bold">Prize: </span>{prize}</p>
                            <p><span className="font-bold">Participation: </span>{participation}</p>
                            <p><span className="font-bold">Deadline: </span>{new Date(deadline).toLocaleDateString()}</p>
                        </div>
                    </div> */}
                    <div className="mx-auto border w-full md:w-1/2 p-5 md:p-8 rounded-lg shadow-md flex-1">
                        <div className="text-sm md:text-lg *:border *:p-1 space-y-1 font-medium *:rounded-md *:shadow-sm">
                            <p><span className="font-bold">Prize: </span>{prize}</p>
                            <p><span className="font-bold">Participation: </span>{participation}</p>
                            <p><span className="font-bold">Entry Fee: </span>${entryFee}</p>
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm entryFee={paymentContest} />
                        </Elements>
                    </div>
            </Container>
        </div>
    );
};

export default Payment;