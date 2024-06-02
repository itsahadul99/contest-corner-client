import { MdDeleteForever } from "react-icons/md";
import useContests from "../../../hooks/useContests";
import { IoMdCheckmark } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
const ManageContests = () => {
    const [contests] = useContests()
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
                                    {user?.contestName ? user?.contestName: "Not found"}
                                </td>
                                <td>
                                    {user?.creatorEmail}
                                </td>
                                <td>
                                    {user?.status}
                                </td>
                                <td>
                                    <div className="flex items-center justify-center gap-2">
                                        <button title="Approved" className="btn bg-primary border-none hover:bg-secondary btn-xs"><IoMdCheckmark size={20} /></button>
                                        <button title="Delete" className="btn bg-rose-900 border-none hover:bg-rose-950 btn-xs"><MdDeleteForever size={20} /></button>
                                        <button title="Comment" className="btn btn-xs bg-green-400 hover:bg-green-800 border-none"><CiEdit size={20} /></button>
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