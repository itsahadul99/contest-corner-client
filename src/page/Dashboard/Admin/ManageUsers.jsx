import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import DropdownMenu from "../../../components/DropdownMenu";
import toast from "react-hot-toast";
const ManageUsers = () => {
    const axiosCommon = useAxiosCommon()
    const {data: users= [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const {data} = await axiosCommon.get('/users')
            return data
        }
    })
    const handleDelete = async id => {
        const {data} = await axiosCommon.delete(`/user/delete/${id}`)
        if(data.deleteCount > 0){
            refetch()
            toast.success("Successfully delete the user")
        }
    }
    return (
        <div>
            <div className="overflow-x-auto overflow-y-auto p-8 shadow-sm mt-12 bg-gray-100 rounded-md border">
                <div className="text-[#151515] font-bold my-5 text-2xl uppercase ">
                    <h1>Total User: {users.length}</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr className="font-inter uppercase bg-primary/70 text-white">
                            <th>NAME</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => <tr key={user?._id}>
                                <td>
                                    {user?.name ? user?.name: "Not found"}
                                </td>
                                <td>
                                    {user?.email}
                                </td>
                                <td>
                                    {user?.role}
                                </td>
                                <td>
                                    <DropdownMenu user={user} handleDelete={handleDelete} refetch={refetch}/>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageUsers;