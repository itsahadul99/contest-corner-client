import Container from "../components/shared/Container";
import HelmetTitle from "../components/HelmetTitle";
import ContestCard from "../components/ContestCard";
import Spinner from "../components/shared/Spinner";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
const AllContest = () => {
    const { count } = useLoaderData();
    const axiosCommon = useAxiosCommon();
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [tabValue, setTabValue] = useState("");

    // Fetch contests with filtering and pagination
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["contests", currentPage, itemPerPage, tabValue],
        queryFn: async () => {
            const url = tabValue
                ? `/contests/search?value=${tabValue}&page=${currentPage}&size=${itemPerPage}`
                : `/contests?page=${currentPage}&size=${itemPerPage}`;
            const { data } = await axiosCommon.get(url);
            console.log(data);
            
            return data;
        },
    });

    const numberOfPage = Math.ceil(count / itemPerPage);
    const pageNumber = [...Array(numberOfPage).keys()];

    const handleItemPerPage = (e) => {
        const value = parseInt(e.target.value);
        setItemPerPage(value);
        setCurrentPage(0);
    };

    const handleNext = () => {
        if (currentPage < pageNumber.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleTab = (value) => {
        setTabValue(value);
        setCurrentPage(0); // Reset pagination when changing tabs
    };

    if (isLoading) return <Spinner />;
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <HelmetTitle title="All Contest" />
            <Container>
                {/* Tab Buttons */}
                <div className="flex justify-start px-5 lg:px-10 pb-8">
                    <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap">
                        {["gaming", "book", "movie", "marketing", "business"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTab(tab)}
                                className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${tabValue === tab ? "border-primary" : ""
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contest Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 items-center">
                    {contests.map(
                        (contest) =>
                            contest?.status === "Accepted" && (
                                <ContestCard key={contest._id} contest={contest} />
                            )
                    )}
                </div>

                {/* Pagination */}
                <div className="my-5 lg:my-8 px-2 py-1 md:px-5 md:py-2 bg-gray-100 w-fit mx-auto rounded-full">
                    <button
                        onClick={handlePrev}
                        className="btn border-none rounded-none mr-2"
                    >
                        Prev
                    </button>
                    {pageNumber.map((number, idx) => (
                        <button
                            onClick={() => setCurrentPage(number)}
                            className={`${currentPage === number ? "bg-primary" : "bg-gray-200"
                                } btn border-none rounded-none`}
                            key={idx}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button onClick={handleNext} className="btn border-none rounded-none">
                        Next
                    </button>
                    <select
                        className="h-[40px] bg-gray-200 w-[50px]"
                        value={itemPerPage}
                        onChange={handleItemPerPage}
                    >
                        <option value={5}>5 page</option>
                        <option value={10}>10 page</option>
                        <option value={20}>20 page</option>
                    </select>
                </div>
            </Container>
        </div>
    );

};

export default AllContest;