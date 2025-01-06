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
                <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-6 text-indigo-600">Leaderboard</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-indigo-100 text-indigo-800">
                                        <th className="px-6 py-3 text-left font-medium">#</th>
                                        <th className="px-6 py-3 text-left font-medium">Name</th>
                                        <th className="px-6 py-3 text-left font-medium">Email</th>
                                        <th className="px-6 py-3 text-left font-medium">Wins</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {leaderBoard.map((data, idx) => (
                                        <tr
                                            key={idx}
                                            className={`border-b hover:bg-indigo-50 transition ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                }`}
                                        >
                                            <td className="px-6 py-3 text-left">{idx + 1}</td>
                                            <td className="px-6 py-3 text-left font-semibold">
                                                {data.name ? data.name : "Unknown"}
                                            </td>
                                            <td className="px-6 py-3 text-left">{data.email}</td>
                                            <td className="px-6 py-3 text-left font-bold">{data.winCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 p-4 bg-indigo-100 rounded-xl text-center shadow-lg">
                            <p className="text-indigo-800 font-semibold text-lg">
                                Your Rank: {leaderBoard.findIndex(data => data.email === user?.email) + 1 || "Not Available"}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LeaderBoard;