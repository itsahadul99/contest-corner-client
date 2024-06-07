/* eslint-disable react/no-unescaped-entities */
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import Join from '../../assets/team.png';
import Prepare from '../../assets/people.png';
import Trophy from '../../assets/trophy.png';
const HowItWorks = () => {
    return (
        <section className="py-20 bg-base-100">
            <SectionTitle title="How It Works" subTitle="See the lineup" />
            <Container>
                <div className=" mx-auto text-center">
                    <div className="grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-8">
                        <div className="flex flex-col text-center p-5 space-y-2 md:space-y-4">
                            <img className="size-16 mx-auto my-2" src={Join} alt="" />
                            <h3 className="text-xl md:text-lg lg:text-2xl font-semibold mb-2">Join a Contest</h3>
                            <p className="text-gray-600">Sign up for any contest that matches your interests and skills. It's easy and quick!</p>
                        </div>
                        <div className="mx-auto">
                            <FaArrowRight size={50} className="hidden md:block" />
                            <FaArrowDown size={50} className="block md:hidden" />
                        </div>
                        <div className="flex flex-col text-center p-5 space-y-2 md:space-y-4">
                            <img className="size-16 mx-auto my-2" src={Prepare} alt="" />
                            <h3 className="text-xl md:text-lg lg:text-2xl font-semibold mb-2">Prepare</h3>
                            <p className="text-gray-600">Utilize our resources, study plans, and practice tests to prepare for the contest.</p>
                        </div>
                        <div className="mx-auto">
                            <FaArrowRight size={50} className="hidden md:block" />
                            <FaArrowDown size={50} className="block md:hidden" />
                        </div>
                        <div className="flex flex-col text-center p-5 space-y-2 md:space-y-4">
                            <img className="size-16 mx-auto my-2" src={Trophy} alt="" />
                            <h3 className="text-xl md:text-lg lg:text-2xl font-semibold mb-2">Participate & Win</h3>
                            <p className="text-gray-600">Submit your entry and compete with others. Win amazing prizes and recognition!</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HowItWorks;
