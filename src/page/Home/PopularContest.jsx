
import { useQuery } from "@tanstack/react-query";
import ContestCard from "../../components/ContestCard";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const PopularContest = () => {
    const axiosCommon = useAxiosCommon()
    const { data: popularContests = [], isLoading } = useQuery({
        queryKey: ['popularContest'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/popularContests')
            return data;
        }
    })
    return (
        <Container>
            <SectionTitle title={"Top popular Contest"} subTitle={"Top contest"} />
            {
                isLoading ? <div className="flex justify-center items-center min-h-[250px]">
                    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 items-center">
                    {
                        popularContests.slice(0, 6).map(contest => <ContestCard key={contest._id} contest={contest} />)
                    }
                </div>
            }
        </Container>
    );
};

export default PopularContest;