import Container from "../components/shared/Container";
import HelmetTitle from "../components/HelmetTitle";
import ContestCard from "../components/ContestCard";
import Spinner from "../components/shared/Spinner";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
const AllContest = () => {
    const { count } = useLoaderData()
    const axiosCommon = useAxiosCommon()
    const [itemPerPage, setItemPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['contests', currentPage, itemPerPage],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/contests?page=${currentPage}&size=${itemPerPage}`)
            return data
        }
    })
    const numberOfPage = Math.ceil(count / itemPerPage)
    const pageNumber = [...Array(numberOfPage).keys()]
    const handleItemPerPage = e => {
        const value = parseInt(e.target.value);
        setItemPerPage(value)
        setCurrentPage(0)
    }
    const handleNext = () => {
        if (currentPage < pageNumber.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const [tabValue, setTabValue] = useState('')
    const { data: tabData = [], } = useQuery({
        queryKey: ['search', tabValue],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/contests/search?value=${tabValue}`)
            return data
        }
    })
    const handleTab = (value) => {
        setTabValue(value)
    }
    console.log(itemPerPage, currentPage);
    if (isLoading) return <Spinner />
    return (
        <div className="min-h-[calc(100vh-380px)]">
            <HelmetTitle title="All Contest" />
            <Container>
                <div className="flex justify-start px-5 lg:px-10 my-3">
                    <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap">
                        <button
                            onClick={() => {
                                handleTab("gaming")
                            }}
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${tabValue === 'gaming' ? 'border-primary' : ''}`}>Gaming</button>
                        <button
                            onClick={() => {
                                handleTab("book")
                            }}
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${tabValue === 'book' ? 'border-primary' : ''}`}
                        >Book
                        </button>
                        <button
                            onClick={() => {
                                handleTab('movie')
                            }}
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${tabValue === 'movie' ? 'border-primary' : ''}`}
                        >Movie
                        </button>
                        <button onClick={() => {
                            handleTab('marketing')
                        }}
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${tabValue === 'marketing' ? 'border-primary' : ''}`}
                        >
                            Marketing
                        </button>
                        <button onClick={() => {
                            handleTab('business')
                        }}
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${tabValue === 'business' ? 'border-primary' : ''}`}
                        >
                            Business
                        </button>

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
                    {
                        !tabData.length > 0 && contests?.map(contest => contest?.status === 'Accepted' && <ContestCard key={contest._id} contest={contest} />)
                    }
                    {
                        tabData.map(contest => contest?.status === 'Accepted' && <ContestCard key={contest._id} contest={contest} />)
                    }
                </div>
                <div className="my-5 lg:my-8 px-2 py-1 md:px-5 md:py-2 bg-gray-100 w-fit mx-auto rounded-full">
                    <button onClick={handlePrev} className="btn border-none rounded-none mr-2">Prev</button>
                    {
                        pageNumber.map((number, idx) => <button onClick={() => setCurrentPage(number)} className={`${currentPage === number ? 'bg-primary' : 'bg-gray-200'} btn border-none rounded-none`} key={idx}>{number + 1}</button>)
                    }
                    <button onClick={handleNext} className="btn border-none rounded-none">Next</button>
                    <select value={itemPerPage} onChange={handleItemPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </Container>
        </div>
    );
};

export default AllContest;