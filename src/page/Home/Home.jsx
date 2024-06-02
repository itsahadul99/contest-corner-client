import Banner from "./Banner";
import PopularContest from "./PopularContest";
import HelmetTitle from "../../components/HelmetTitle";

const Home = () => {
    const handleSearch = e => {
        e.preventDefault()
    }
    return (
        <div>
            <HelmetTitle  title="Home"/>
            <Banner handleSearch={handleSearch} />
            <PopularContest />
        </div>
    );
};

export default Home;