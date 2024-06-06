import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../components/shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Container from "../components/shared/Container";
import useAuth from "../hooks/useAuth";
const LeaderBoard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: leaderBoard = [] } = useQuery({
        queryKey: ['leaderBoard'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/leaderBoard')
            return data;
        }
    })
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <SectionTitle title="See Your Position" subTitle="See your label" />
            <Container>
                <div className="flex flex-col items-center justify-center py-5 md:py-10 bg-base-200">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                        <h2 className="text-xl md:text-2xl text-center lg:text-3xl font-bold mb-4">Leaderboard</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Wins</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        leaderBoard.map((data, idx) => <> <tr key={idx} className="border-t *:px-4 *:py-2">
                                            <td>{idx + 1}</td>
                                            <td>{data.name ? data.name : 'Unknown'}</td>
                                            <td>{data.email}</td>
                                            <td>{data.winCount}</td>
                                        </tr></>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center">
                            <p className="text-indigo-700 font-semibold">Your Rank: {leaderBoard.map((data, idx) => data.email === user?.email ? idx + 1 : '')}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LeaderBoard;