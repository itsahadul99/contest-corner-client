import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import TaskSubmitModal from "../../../components/TaskSubmitModal";

const MyParticipantContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedContest, setSelectedContest] = useState(null)
    const { data = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user?.email}`)
            return data
        }
    })
    const openModal = contest => {
        setIsOpen(true)
        setSelectedContest(contest)
    }
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <SectionTitle title="My Participant Contest" subTitle="Ready for next" />
            <div className="overflow-x-auto overflow-y-auto p-8 shadow-sm bg-gray-100 rounded-md border">
                <div className="text-[#151515] font-bold my-5 text-2xl uppercase ">
                    <h1>My Total Contest: {data.length}</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr className="font-inter uppercase bg-primary/70 text-white">
                            <th>Title</th>
                            <th>Transaction Id</th>
                            <th>Prize</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((contest) => <tr key={contest?._id}>
                                <td>
                                    {contest?.contestName ? contest?.contestName : "Not found"}
                                </td>
                                <td>
                                    {contest?.transactionId}
                                </td>
                                <td>
                                    ${contest?.prize}
                                </td>
                                <td className='text-primary font-medium'>
                                    {contest?.status}
                                </td>
                                <td className="font-bold text-green-400 my-2">
                                    <button onClick={() => openModal(contest)} className="btn btn-sm bg-primary/70 hover:bg-secondary/70 border-none">Submit Task</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                isOpen && (<TaskSubmitModal isOpen={isOpen} setModalOpen={setIsOpen} contest={selectedContest} />)
            }
        </div>
    );
};

export default MyParticipantContest;