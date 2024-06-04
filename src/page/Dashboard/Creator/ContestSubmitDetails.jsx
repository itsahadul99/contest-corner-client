import { useLoaderData, useParams } from "react-router-dom";
import SectionTitle from "../../../components/shared/SectionTitle";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ContestSubmitDetails = () => {
    const data = useLoaderData()
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()
    const {mutateAsync} = useMutation({
        mutationKey: ['declareWin'],
        mutationFn: async (updateData) => {
            const {data} = await axiosSecure.patch(`/declareWin?id=${id}`, updateData)
            return data;
        },
        onSuccess: () => {
            toast.success("Successfully declare winner for this contest")
        }
    })
    const handleDeclareWin = async (email, name, image) => {
        const updateData = {
            winnerEmail: email,
            winnerName: name,
            winnerImg: image,
            contestResult: 'Declared Winner',
            contestId: id,
        }
        try {
            await mutateAsync(updateData)
        } catch (error) {
            console.log(error);
        }
    }
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
                            <button 
                            disabled={item?.contestResult === 'Declared Winner'} 
                            onClick={() => {
                                handleDeclareWin(item?.participantEmail, item?.participantName,item?.participantImg )
                            }} 
                            className="btn btn-sm bg-primary/80 hover:bg-secondary/70">{item?.contestResult === 'Declared Winner'? 'Un Successful': 'Declare win'}</button>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default ContestSubmitDetails;