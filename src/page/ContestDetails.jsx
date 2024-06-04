import { Link, useLoaderData } from "react-router-dom";
import HelmetTitle from "../components/HelmetTitle";
import Container from "../components/shared/Container";
import useRole from "../hooks/useRole";
import toast from "react-hot-toast";
import CountdownTimer from "./Home/CountdownTimer";
const ContestDetails = () => {
    const contest = useLoaderData()
    const { img, contestName, participation, prize, description, deadline, entryFee, taskSubmited, _id, contestResult, winnerName, winnerImg } = contest;
    const [, status, ,] = useRole()
    const handleRegistration = () => {
        if (status === 'blocked') {
            return toast.error("You are blocked by Admin & and can't registration")
        }
        if (contestResult === "Declared Winner") {
            toast.error("This contest winner is already declared. You can't join this!!")
        }
    }
    console.log(contestResult);
    const startDate = new Date(deadline).toISOString();
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <HelmetTitle title="Details Page" />
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-around gap-5 md:gap-8 ">
                    <div className="bg-base-200 p-5 shadow-md">
                        <img className="md:h-[300px] rounded-md w-full bg-contain" src={img} alt="" />
                    </div>
                    <div className=" w-full md:w-1/2 space-y-2 md:space-y-3">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{contestName}</h1>
                        <p className="text-sm md:text-lg font-medium">{description}</p>
                        <p><span className="font-bold text-sm md:text-lg">Task: </span>{taskSubmited}</p>
                        <div className="text-sm md:text-lg font-medium">
                            <div className="flex justify-between">
                                <div>
                                    <p><span className="font-bold">Prize: </span>{prize}</p>
                                    <p><span className="font-bold">Participation: </span>{participation}</p>
                                    <div><CountdownTimer endDate={startDate} /></div>
                                    <p><span className="font-bold">Entry Fee: </span>{entryFee}</p>
                                </div>
                                {
                                    contestResult === "Declared Winner" ? <div className="flex flex-col justify-center items-center">

                                        {
                                            winnerImg && <><p className="text-sm italic">Winner</p> <img className="w-28 rounded-sm h-24 lg:w-36 lg:h-28" src={winnerImg} alt="" /></>
                                        }
                                        <p className="text-sm mt-2">{winnerName}</p>
                                    </div> : ''
                                }
                            </div>
                            <div className="mt-2">
                                <Link to={status === 'blocked' || contestResult === "Declared Winner" ? '/allContest' : `/payment/${_id}`}><button onClick={handleRegistration} className=" text-sm md:text-lg btn bg-primary hover:bg-secondary">Registration</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContestDetails;