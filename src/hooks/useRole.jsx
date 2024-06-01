import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useRole = () => {
    const axiosCommon = useAxiosCommon()
    const {user, loading} = useAuth()
    const { data: role = '', isLoading } = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/user/${user?.email}`)
            return data.role
        }
    })
    return [role, isLoading]
};

export default useRole;