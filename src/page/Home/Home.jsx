import Navbar from "../../components/shared/Navbar";
import Banner from "./Banner";
import PopularContest from "./PopularContest";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <PopularContest />
        </div>
    );
};

export default Home;