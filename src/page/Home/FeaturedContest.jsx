import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import CountdownTimer from "./CountdownTimer";

const FeaturedContest = () => {
    const startDate = new Date('2024-06-31T23:59:59');
    return (
        <div>
            <SectionTitle title="Featured Contest" subTitle="Mark Your Calender" />
            <Container>
                <div className="flex justify-start bg-no-repeat bg-cover min-h-[calc(100vh-100px)]">
                    <CountdownTimer endDate={startDate} />
                </div>
            </Container>
        </div>
    );
};

export default FeaturedContest;