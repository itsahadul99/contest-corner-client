import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()
    const { data = [], isLoading } = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`)
            return data
        }
    })
    const role = data?.role;
    const status = data?.status;
    return [role,status, isLoading]
};

export default useRole;