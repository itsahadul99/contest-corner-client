import { MdDeleteForever } from "react-icons/md";
import useContests from "../../../hooks/useContests";
import { IoMdCheckmark } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CommentModal from "../../../components/CommentModal";
import { useState } from "react";
import DashboardHelmet from "../../../components/DashboardHelmet";
const ManageContests = () => {
    const [contests, isLoading, refetch] = useContests()
    const axiosSecure = useAxiosSecure()
    const handleConfirm = async id => {
        const updateContest = {
            status: 'Accepted'
        }
        const { data } = await axiosSecure.patch(`/contests/update/${id}`, updateContest)
        if (data.modifiedCount > 0) {
            refetch()
            toast.success("Approved this contest successfully")
        }

    }
    const handleDelete = id => {
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
    const [isOpen, setIsOpen] = useState(false)
    const [commentId, setCommentId] = useState()
    return (
        <div>
            <DashboardHelmet title="Manage Contest" />
            <div className="overflow-x-auto overflow-y-auto p-8 shadow-sm bg-gray-100 rounded-md border">
                <div className="text-[#151515] font-bold my-5 text-2xl uppercase ">
                    <h1>Total Contest:{contests.length}</h1>
                </div>
                {isLoading ? <div className="flex justify-center items-center min-h-40">
                    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                </div> : <table className="table">
                    <thead>
                        <tr className="font-inter bg-primary/70 text-white *:border uppercase">
                            <th className="text-center">SL</th>
                            <th>Title</th>
                            <th>Creator Email</th>
                            <th>Status</th>
                            <th className="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((user, idx) => <tr key={user?._id} className="*:border bg-white text-gray-700">
                                <td className="text-center">
                                    {idx + 1}
                                </td>
                                <td>
                                    {user?.contestName ? user?.contestName : "Not found"}
                                </td>
                                <td>
                                    {user?.creatorEmail}
                                </td>
                                <td>
                                    {user?.status}
                                </td>
                                <td>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            disabled={user?.status === 'Accepted'}
                                            onClick={() => handleConfirm(user._id)}
                                            title="Accepted"
                                            className="btn disabled:cursor-not-allowed bg-primary border-none hover:bg-secondary btn-xs"><IoMdCheckmark size={20} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            title="Delete"
                                            className="btn bg-red-700 border-none hover:bg-rose-950 btn-xs">
                                            <MdDeleteForever size={20} />
                                        </button>
                                        <button
                                            disabled={user?.comment}
                                            onClick={() => {
                                                setCommentId(user?._id)
                                                setIsOpen(true)
                                            }}
                                            title="Comment"
                                            className="btn btn-xs bg-green-400 hover:bg-green-800 border-none"><CiEdit size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                        <CommentModal setModalOpen={setIsOpen} isOpen={isOpen} id={commentId} />
                    </tbody>

                </table>}
            </div>
        </div>
    );
};

export default ManageContests;