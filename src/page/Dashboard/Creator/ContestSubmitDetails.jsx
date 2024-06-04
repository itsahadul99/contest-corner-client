import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/shared/SectionTitle";

const ContestSubmitDetails = () => {
    const data = useLoaderData()
    return (
        <>
            <SectionTitle title="Submitted Task Answer" subTitle="Make a Winner" />
            <div className="space-y-3 md:space-y-5">
                {
                    data.map(item => <div
                        key={item._id}
                        className=" bg-gray-100 p-5 h-fit  space-y-2 rounded-lg shadow-md text-black"
                    >
                        <h1 className="text-lg md:text-xl font-bold">Participant Name: {item?.participantName}</h1>
                        <h1 className="text-sm md:text-lg font-semibold">Participant Email: {item?.participantEmail}</h1>
                        <p className="text-xs md:text-lg font-medium"><span className="font-semibold">Participant Ans:</span> {item?.answer.slice(0, 300)}</p>
                        <div className="flex justify-end">
                            <button className="btn btn-sm bg-primary/80 hover:bg-secondary/70">Declare Win</button>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default ContestSubmitDetails;