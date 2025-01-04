import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay } from 'swiper/modules';
import { Fade } from 'react-awesome-reveal';
import { Link } from "react-router-dom";

const BestContestCreator = () => {
    const axiosCommon = useAxiosCommon();
    const { data: topCreators = [] } = useQuery({
        queryKey: ['topCreator'],
        queryFn: async () => {
            const { data } = await axiosCommon.get("/topCreators");
            return data;
        }
    });

    return (
        <div>
            <SectionTitle title="Best Contest Creators" subTitle={`Top #${topCreators.length} Creators`} />
            <Container>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
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
                        topCreators.map(creator => (
                            <SwiperSlide key={creator._id} className="pb-2 bg-base-100">
                                <Fade triggerOnce direction="up">
                                    <div className="relative group bg-base-100 rounded-lg shadow-md overflow-hidden ">
                                        <div
                                            style={{ backgroundImage: `url(${creator?.creatorImg})` }}
                                            className="w-full h-[250px] bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                                        >
                                            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-6 text-center space-y-3">
                                            <h2 className="text-2xl font-semibold hover:text-indigo-500 transition-colors duration-300">{creator?.creatorName}</h2>
                                            <p className="text-sm ">Contest Participant: <span className="font-medium text-indigo-500">{creator?.participation}</span></p>
                                        </div>
                                        <Link to={'/allContest'} className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white text-center py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="font-semibold">Join Their Contests Now</p>
                                        </Link>
                                    </div>
                                </Fade>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </div>
    );
};

export default BestContestCreator;
