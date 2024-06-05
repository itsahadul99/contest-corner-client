import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";
const BestContestCreator = () => {
    const axiosCommon = useAxiosCommon()
    const { data: topCreators = [] } = useQuery({
        queryKey: ['topCreator'],
        queryFn: async () => {
            const { data } = await axiosCommon.get("/topCreators")
            return data;
        }
    })
    return (
        <div>
            <SectionTitle title="Best Contest Creators" subTitle={`Top #${topCreators.length} Creators`} />
            <Container>
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8">
                    {
                        topCreators.map(creator => <div key={creator._id} className="flex flex-col justify-center items-center border p-5 lg:p-10 rounded-lg shadow-md bg-primary/5 hover:skew-x-3 cursor-pointer hover:scale-105 duration-500">
                            <div className="rounded-xl">
                                <img className="md:h-[130px] object-contain rounded-full" src={creator.creatorImg} alt="" />
                            </div>
                            <div className="text-center">
                                <h1 className="text-lg my-2 md:text-xl font-bold">{creator?.creatorName}</h1>
                                <p>Participant Count: {creator?.participation}</p>
                            </div>
                        </div>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default BestContestCreator;