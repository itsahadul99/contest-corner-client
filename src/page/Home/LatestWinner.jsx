/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const LatestWinner = () => {
    const axiosCommon = useAxiosCommon()
    const { data: LatestWinner = [], isLoading } = useQuery({
        queryKey: ['latestWinner'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/latestWinner')
            return data;
        }
    })
    return (
        <div>
            <SectionTitle title="Latest Contest Winner" subTitle="latest winner" />
            <Container>
                {
                    isLoading ? <div className="flex justify-center items-center min-h-[250px]">
                        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                    </div> : <div className="flex min-h-[700px] w-full items-center justify-center bg-base-100 rounded-lg px-8">
                        {LatestWinner.map(contest => (
                            <div key={contest._id} className="flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between">
                                <div className="max-w-md md:space-y-6 sm:space-y-5 space-y-4">
                                    <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold leading-tight ">
                                        Congratulations {contest.winnerName}!
                                    </h1>
                                    <p className="lg:text-lg sm:text-base text-sm">
                                        {contest.winnerName} has won the "<span className="font-bold">{contest.contestName}</span>" with their outstanding skills and creativity. This contest was all about {contest.description.toLowerCase()}.
                                    </p>
                                    <p className="lg:text-lg sm:text-base text-sm">
                                        Are you ready to showcase your talent and compete for amazing prizes? Participate in our contests and become our next winner!
                                    </p>
                                    <div className="flex space-x-4">
                                        <Link to='/allContest' className="inline-flex flex-nowrap items-center justify-center rounded-md text-sm font-medium hover:bg-secondary/90 h-10 px-4 py-2 bg-primary text-white">
                                            Participant Now
                                        </Link>
                                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium  hover:bg-secondary/70 h-10 px-4 py-2 bg-transparent text-primary">
                                            Learn More
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">Join the contest and aim for the top!</p>
                                </div>
                                <Fade duration={2000}>
                                    <div className="relative">
                                        <img src={contest.winnerImg} className="relative md:h-[600px] sm:h-[500px] h-[300px] w-[500px] bg-gray-400 rounded-b-full object-cover" alt="Winner" />
                                    </div>
                                </Fade>
                            </div>
                        ))}
                    </div>
                }
            </Container>
        </div>
    );
};

export default LatestWinner;