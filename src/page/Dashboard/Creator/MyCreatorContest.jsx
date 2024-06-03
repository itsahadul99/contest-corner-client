import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/shared/SectionTitle";

const MyCreatorContest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: myContests = [], refetch } = useQuery({
        queryKey: ['myContest', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myContest/${user?.email}`)
            return data;
        }
    })
    const handleDelete = async id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/contests/delete/${id}`)
                if (data.deletedCount) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <div>
            <SectionTitle title="Your Added Contest" subTitle="Watch your" />
                <div className="overflow-x-auto overflow-y-auto p-8 shadow-sm  bg-gray-100 rounded-md border">
                    <div className="text-[#151515] font-bold my-5 text-2xl uppercase ">
                        <h1>My Total Contest:{myContests.length}</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className="font-inter uppercase bg-primary/70 text-white">
                                <th>Title</th>
                                <th>Status</th>
                                <th>ACTION</th>
                                <th>Submission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myContests.map((contest) => <tr key={contest?._id}>
                                    <td>
                                        {contest?.contestName ? contest?.contestName : "Not found"}
                                    </td>
                                    <td className={contest?.status === 'Approved' ? 'text-primary font-medium' : 'text-secondary font-medium'}>
                                        {contest?.status}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                disabled={contest?.status === 'Approved'}
                                                onClick={() => handleDelete(contest._id)}
                                                title="Delete"
                                                className="btn bg-red-700 border-none hover:bg-rose-950 btn-xs">
                                                <MdDeleteForever size={20} />
                                            </button>
                                            <Link to={`/dashboard/editContest/${contest?._id}`}
                                                disabled={contest?.status === 'Approved'}
                                                title="Comment"
                                                className="btn btn-xs bg-green-400 hover:bg-green-800 border-none"><CiEdit size={20} />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to='/dashboard/contestSubmitted' className="px-2 py-1 border rounded-full bg-primary/20 hover:bg-secondary/20 text-black font-bold">Submission</Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
        </div>
    );
};

export default MyCreatorContest;