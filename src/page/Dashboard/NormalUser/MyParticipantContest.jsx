import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/shared/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyParticipantContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data = [] } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user?.email}`)
            return data
        }
    })
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <SectionTitle title="My Participant Contest" subTitle="Ready for next" />
            <Container>
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
                                    <td className="font-bold text-green-400">
                                        <Link to='/dashboard/contestSubmitted' className="btn btn-sm bg-primary/70 hover:bg-secondary/70">Submit Task</Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default MyParticipantContest;