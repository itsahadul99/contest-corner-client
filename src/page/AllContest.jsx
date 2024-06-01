import Container from "../components/shared/Container";
import HelmetTitle from "../components/HelmetTitle";
import ContestCard from "../components/ContestCard";
import Spinner from "../components/shared/Spinner";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
const AllContest = () => {
    const axiosCommon = useAxiosCommon()
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/contests')
            return data
        }
    })
    if (isLoading) return <Spinner />
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <HelmetTitle title="All Contest" />
            <Container>
                <div>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
                    {
                        contests?.map(contest => contest?.status === 'Approved' && <ContestCard key={contest._id} contest={contest} />)
                    }
                </div>
            </Container>
        </div>
    );
};

export default AllContest;