import { useGetAllUsersQuery } from "../services/userApi";
import { User } from "../types/user.type";

export const useUsers = () => {
    const { data, isLoading, error, refetch } = useGetAllUsersQuery();

    const users: User[] = data?.data || [];
    const loading = isLoading;

    return {
        users,
        loading,
        error: error ? (error as any).message || JSON.stringify(error) : null,
        getAllUsers: refetch,
    };
};
