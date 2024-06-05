import Banner from "./Banner";
import PopularContest from "./PopularContest";
import HelmetTitle from "../../components/HelmetTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import ContestCard from "../../components/ContestCard";
import BestContestCreator from "./BestContestCreator";
import LatestWinner from "./LatestWinner";

const Home = () => {
    const axiosCommon = useAxiosCommon()
    const [value, setValue] = useState('')
    const { data: searchData = [] } = useQuery({
        queryKey: ['search', value],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/contests/search?value=${value}`)
            return data
        }
    })
    const handleSearch = async e => {
        e.preventDefault()
        const searchValue = e.target.value.value;
        if (searchValue === '') return toast.error('Please enter tags name first')
        setValue(searchValue)
        e.target.reset()
    }
    return (
        <>
            <HelmetTitle title="Home" />
            <Banner handleSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-7xl mx-auto mt-2">
                {
                    searchData.map(contest => <ContestCard key={contest._id} contest={contest} />)
                }
            </div>
            <PopularContest />
            <LatestWinner />
            <BestContestCreator />
        </>
    );
};

export default Home;