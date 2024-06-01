import Banner from "./Banner";
import PopularContest from "./PopularContest";
import HelmetTitle from "../../components/HelmetTitle";

const Home = () => {
    return (
        <div>
            <HelmetTitle  title="Home"/>
            <Banner />
            <PopularContest />
        </div>
    );
};

export default Home;