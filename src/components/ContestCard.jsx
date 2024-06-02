/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ContestCard = ({contest}) => {
    const {img, contestName,participation, description, deadline, _id} = contest;
    return (
        <div className="card lg:card-side bg-base-100 shadow-md border m-5 p-5">
            <div className="flex items-center">
                <img className="w-[350px] h-[200px] bg-contain rounded-md" src={img} alt="Img" />
            </div>
            <div className="card-body">
                <h2 className="text-lg md:text-xl font-bold">{contestName}</h2>
                <p className="text-xs md:text-sm font-medium">{description.slice(0, 80)}.....</p>
                <p className="text-sm md:text-lg font-semibold">Participation: {participation}</p>
                <p className="text-sm md:text-lg font-medium">Deadline: {new Date(deadline).toLocaleDateString()}</p>
                <div className="card-actions justify-end">
                    <Link to={`/contestDetails/${_id}`} className=" text-sm md:text-lg btn bg-primary hover:bg-secondary">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;