import { MdDeleteForever } from "react-icons/md";
import useContests from "../../../hooks/useContests";
import { IoMdCheckmark } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const ManageContests = () => {
    const [contests, , refetch] = useContests()
    const axiosSecure = useAxiosSecure()
    const handleConfirm = async id => {
        const updateContest = {
            status: 'Approved'
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
    const handleComment = async (id) => {
        console.log(id);
        // const updateContest = {
        // }
        // const { data } = await axiosSecure.patch(`/contests/update/${id}`, updateContest)
        // if (data.modifiedCount > 0) {
        //     refetch()
        //     toast.success("Approved this contest successfully")
        // }
    }
    return (
        <div>
            <div className="overflow-x-auto overflow-y-auto p-8 shadow-sm mt-12 bg-gray-100 rounded-md border">
                <div className="text-[#151515] font-bold my-5 text-2xl uppercase ">
                    <h1>Total Contest:{contests.length}</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr className="font-inter uppercase bg-primary/70 text-white">
                            <th>Title</th>
                            <th>Creator Email</th>
                            <th>Status</th>
                            <th className="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((user) => <tr key={user?._id}>
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
                                            disabled={user?.status === 'Approved'}
                                            onClick={() => handleConfirm(user._id)}
                                            title="Approved"
                                            className="btn disabled:cursor-not-allowed bg-primary border-none hover:bg-secondary btn-xs"><IoMdCheckmark size={20} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            title="Delete"
                                            className="btn bg-red-700 border-none hover:bg-rose-950 btn-xs">
                                            <MdDeleteForever size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleComment(user?._id)}
                                            title="Comment"
                                            className="btn btn-xs bg-green-400 hover:bg-green-800 border-none"><CiEdit size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageContests;