/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/shared/Container";
import SectionTitle from "../../../components/shared/SectionTitle";

const MyWinningContext = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: winningContests = [] } = useQuery({
        queryKey: ['winningContest', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/winningContest?name=${user?.displayName}`)
            return data;
        }
    })
    console.log(winningContests);
    return (
        <div className="text-black">
            {
                winningContests.length > 0 && <SectionTitle title="See Your Winner Contest" subTitle="Don't lose hope" />
            }
            <Container>
                {winningContests.length > 0 ? <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4 rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-5">
                        {
                            winningContests.map(contest => <div key={contest._id} className="bg-white text-gray-800 rounded-lg shadow-lg p-6 md:p-12 w-full max-w-fit">
                                <div className="text-center">
                                    <h2 className="text-sm md:text-lg lg:text-xl font-bold mb-4">Congratulations!</h2>
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{user?.displayName}</h2>
                                    <p className="text-sm md:text-lg mb-8">You've won this contest</p>
                                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-800 rounded-lg py-3 px-6 mb-4 w-fit">
                                        <h3 className="text-xl md:text-2xl font-semibold"> {contest?.contestName}</h3>
                                    </div>
                                    <p className="text-xs md:text-lg font-bold text-gray-600">Prize: ${contest.prize}</p>
                                </div>
                                <div className="mt-6 text-center">
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm md:text-lg py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
                                        Claim Your Prize
                                    </button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                    : <div className=" text-center space-y-2">
                        <h1 className="text-xl md:text-2xl font-bold">Sorry, {user?.displayName}</h1>
                        <p>You don't win any contest. Try again!!</p>
                    </div>}

            </Container>
        </div>
    );
};

export default MyWinningContext;