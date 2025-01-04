/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";

const ContestCard = ({ contest }) => {
    const {
        contestName,
        deadline,
        description,
        entryFee,
        img,
        participation,
        prize,
        tags,
        _id,
    } = contest;

    return (
        <div className="w-[380px] max-h-[420px] mx-auto shadow-lg overflow-hidden relative border rounded-xl">
            {/* Image Section */}
            <Slide triggerOnce direction="up" duration={700}>
                <div className="hover:bg-gray-100 transition-colors duration-300">
                    <img
                        className="w-full object-cover h-[200px] bg-contain transform hover:scale-105 transition-transform duration-300"
                        src={img}
                        alt="Contest"
                    />
                </div>
            </Slide>

            <Slide triggerOnce direction="right" duration={700} className="absolute top-0 font-medium tracking-wide right-0 text-white text-xs bg-secondary p-2">
                <div >
                    <p>{tags}</p>
                </div>
            </Slide>
            {/* Contest Details */}
            <Fade triggerOnce direction="up" cascade duration={800}>
                <div className="bg-base-100 p-2">
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold">{contestName}</h2>
                        <p className="text-xs md:text-sm font-medium">
                            {description.slice(0, 80)}...
                        </p>
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <p>Participation: {participation}</p>
                            <p>Prize: {prize}</p>
                        </div>
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <p>Entry Fee: ${entryFee}</p>
                            <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </Fade>

            {/* See Details Button */}
            <Fade triggerOnce delay={300} duration={900}>
                <div>
                    <Link
                        to={`/contestDetails/${_id}`}
                        className="relative inline-flex items-center justify-center w-full py-3 overflow-hidden tracking-normal font-semibold text-sm md:text-lg text-white bg-primary rounded-b-xl group"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-secondary rounded-b-xl group-hover:w-full group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30"></span>
                        <span className="relative">See Details</span>
                    </Link>
                </div>
            </Fade>
        </div>
    );
};

export default ContestCard;
