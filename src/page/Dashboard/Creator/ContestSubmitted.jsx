import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/shared/Container";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/shared/SectionTitle";

const ContestSubmitted = () => {
    // eslint-disable-next-line no-unused-vars
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data = [] } = useQuery({
        queryKey: ['submittedTask'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/submittedTask`)
            return data
        }
    })
    return (
        <div>
            <SectionTitle title="See all the Submission" subTitle="Click to show Answer" />
            <Container>
                {/* <div className="overflow-x-auto overflow-y-auto p-8 shadow-sm  bg-gray-100 rounded-md border">
                    <table className="table">
                        <thead>
                            <tr className="font-inter uppercase bg-primary/70 text-white">
                                <th>Title</th>
                                <th>Prize</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((contest) => <tr key={contest?._id}>
                                    <td>
                                        {contest?.contestName}
                                    </td>
                                    <td>
                                        ${contest?.prize}
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 p-8">
                    {
                        data.map(contest => <div key={contest._id} className="bg-gray-100 p-5 md:p-8 rounded-md space-y-2 text-black hover:scale-105 duration-500 shadow-md border border-primary">
                           <h1 className="text-lg font-bold "> Contest Title:  <span className="font-medium">{contest.contestName}</span></h1>
                            <p className="font-medium">Prize: ${contest.prize}</p>
                            <div className="flex justify-end">
                                <Link to={`/dashboard/contestSubmitDetails/${contest?.contestId}`} className="btn btn-sm bg-primary/80 hover:bg-secondary/70">View Submission</Link>
                            </div>
                        </div>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default ContestSubmitted;