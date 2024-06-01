import { useLoaderData } from "react-router-dom";
import HelmetTitle from "../components/HelmetTitle";
import Container from "../components/shared/Container";
const ContestDetails = () => {
    const contest = useLoaderData()
    const { img, contestName, participation, prize, description, deadline, entryFee, _id, taskSubmited } = contest;
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
                            <p><span className="font-bold">Prize: </span>{prize}</p>
                            <p><span className="font-bold">Participation: </span>{participation}</p>
                            <p><span className="font-bold">Deadline: </span>{deadline}</p>
                            <div className="flex justify-between items-center w-full">
                                <p><span className="font-bold">Entry Fee: </span>{entryFee}</p>
                                <button className=" text-sm md:text-lg btn bg-primary hover:bg-secondary">Registration</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContestDetails;