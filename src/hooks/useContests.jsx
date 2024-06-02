import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useContests = () => {
    const axiosCommon = useAxiosCommon()
    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/contests')
            return data
        }
    })
    return [contests, isLoading, refetch]
};

export default useContests;