
import { useQuery } from "@tanstack/react-query";
import ContestCard from "../../components/ContestCard";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const PopularContest = () => {
    const axiosCommon = useAxiosCommon()
    const { data: popularContests = [] } = useQuery({
        queryKey: ['popularContest'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/popularContests')
            return data;
        }
    })
    return (
        <Container>
            <SectionTitle title={"Top popular Contest"} subTitle={"Top contest"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {
                    popularContests.slice(0, 4).map(contest => <ContestCard key={contest._id} contest={contest} />)
                }
            </div>
        </Container>
    );
};

export default PopularContest;