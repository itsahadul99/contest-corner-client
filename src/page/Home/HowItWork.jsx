/* eslint-disable react/no-unescaped-entities */
import { Fade } from 'react-awesome-reveal';
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import Join from '../../assets/team.png';
import Prepare from '../../assets/people.png';
import Trophy from '../../assets/trophy.png';

const HowItWorks = () => {
    return (
        <section className="bg-stage-100">
            <SectionTitle title="How It Works" subTitle="Follow these steps to get started" />
            <Container>
                <div className="mx-auto text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center justify-center">
                        {/* Step 1: Join a Contest */}
                        <Fade left delay={200}>
                            <div className="flex flex-col items-center p-8 bg-base-100  rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 border ">
                                <img className="w-24 h-24 object-contain mb-6" src={Join} alt="Join Contest" />
                                <h3 className="text-2xl font-semibold mb-4">Step 1: Join a Contest</h3>
                                <p className=" text-base mb-4">Browse through a wide selection of contests that match your skills, interests, and goals. Select one that suits you, and sign up to participate!</p>
                            </div>
                        </Fade>

                        {/* Step 2: Prepare */}
                        <Fade left delay={400}>
                            <div className="flex flex-col items-center p-8 bg-base-100  rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 border ">
                                <img className="w-24 h-24 object-contain mb-6" src={Prepare} alt="Prepare" />
                                <h3 className="text-2xl font-semibold mb-4">Step 2: Prepare for Success</h3>
                                <p className=" text-base mb-4">Make use of our comprehensive resources, expert-curated study plans, and practice tests to fully prepare yourself. Build your skills and increase your chances of winning!</p>
                            </div>
                        </Fade>

                        {/* Step 3: Participate & Win */}
                        <Fade left delay={600}>
                            <div className="flex flex-col items-center p-8 bg-base-100  rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 border ">
                                <img className="w-24 h-24 object-contain mb-6" src={Trophy} alt="Win" />
                                <h3 className="text-2xl font-semibold mb-4">Step 3: Participate & Win</h3>
                                <p className=" text-base mb-4">Submit your entry and engage in friendly competition with other contestants. Perform your best and stand a chance to win amazing prizes, recognition, and more!</p>
                            </div>
                        </Fade>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HowItWorks;
