import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay } from 'swiper/modules';
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
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    className="mySwiper"
                >
                    {
                        topCreators.map(creator => <SwiperSlide key={creator._id}>
                            <div key={creator._id}>
                                <div
                                    style={{ backgroundImage: `url(${creator?.creatorImg})` }}
                                    className=" bg-cover object-contain hover:-rotate-2 bg-no-repeat duration-500 relative grid h-[20rem] w-full max-w-[20rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                                    <div className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent  bg-cover bg-clip-border bg-center text-gray-700 shadow-none border`}>
                                    </div>
                                </div>
                                <h1 className="text-center text-lg md:text-2xl font-semibold mt-4">
                                    {creator?.creatorName}
                                </h1>
                                <p className="text-center text-sm md:text-lg opacity-65">
                                    Contest Participant Count {creator?.participation}
                                </p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </Container >
        </div >
    );
};

export default BestContestCreator;