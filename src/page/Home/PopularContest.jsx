
import ContestCard from "../../components/ContestCard";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useContests from "../../hooks/useContests";

const PopularContest = () => {
    const [contests, isLoading] = useContests()
    return (
        <Container>
            <SectionTitle title={"Top popular Contest"} subTitle={"Top contest"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {
                    contests.slice(0, 4).map(contest => <ContestCard key={contest._id} contest={contest} />)
                }
            </div>
        </Container>
    );
};

export default PopularContest;