
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";

const PopularContest = () => {
    return (
        <Container>
            <SectionTitle title={"Top popular Contest"} subTitle={"Top contest"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
                <div className="card lg:card-side bg-base-100 shadow-md border m-5 p-5">
                    <div className="flex items-center">
                        <img className="w-[350px] h-[200px] rounded-md" src="https://i.ibb.co/41vYVqf/writing-competition.jpg" alt="Img" />
                    </div>
                    <div className="card-body">
                        <h2 className="text-lg md:text-xl font-bold">Ultimate Article Writing Contest</h2>
                        <p className="text-xs md:text-sm font-medium">Share your thoughts and insights on a topic of your choice. The best article</p>
                        <p className="text-sm md:text-lg font-semibold">$10 Entry Fee</p>
                        <div className="card-actions justify-end">
                            <button className=" text-sm md:text-lg btn bg-primary hover:bg-secondary">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopularContest;