import { useQuery } from "@tanstack/react-query";
import DropdownMenu from "../../../components/DropdownMenu";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardHelmet from "../../../components/DashboardHelmet";
const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data
        }
    })
    const handleDelete = async id => {
        const { data } = await axiosSecure.delete(`/user/delete/${id}`)
        if (data.deletedCount > 0) {
            refetch()
            toast.success("Successfully delete the user")
        }
    }
    return (
        <div>
            <DashboardHelmet title="Manage Users" />
            <div className="p-8 shadow-md bg-white rounded-lg border border-gray-300">
                <div className="text-gray-800 font-bold mb-6 text-2xl uppercase text-center">
                    <h1>Total Users: {users.length || "Loading"}</h1>
                </div>
                {
                    isLoading ? <div className="flex justify-center items-center min-h-40">
                        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                    </div> : <div className="overflow-x-auto">
                        <table className="w-full border bg-white shadow-sm">
                            <thead>
                                <tr className="bg-indigo-600 text-white *:border *:px-6 *:py-3 *:text-left text-sm font-semibold uppercase">
                                    <th className="text-center">SL</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th className="!text-center">Role</th>
                                    <th className="!text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {users.map((user, idx) => (
                                    <tr
                                        key={user?._id}
                                        className={`*:border *:px-6 *:py-2 font-medium `}
                                    >
                                        <td className="text-center">{idx + 1}</td>
                                        <td>{user?.name || 'Not Found'}</td>
                                        <td>{user?.email}</td>
                                        <td className={`capitalize ${user?.status == 'blocked'? 'text-red-400': ''}`}>{user?.status}</td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 block text-center text-xs font-semibold rounded-full capitalize ${user?.role === 'admin'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : user?.role === 'creator'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {user?.role}
                                            </span>
                                        </td>
                                        <td>
                                            <DropdownMenu user={user} handleDelete={handleDelete} refetch={refetch} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>

        </div>
    );
};

export default ManageUsers;