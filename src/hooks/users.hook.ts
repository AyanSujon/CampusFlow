import { getAllUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export type GetAllUsersParams = {
    page?: number;
    limit?: number;
    searchTerm?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export const useGetAllUsers = (params: GetAllUsersParams) => {
    return useQuery({
        queryKey: ["users", "all", params],
        queryFn: () => getAllUsers(params),
        placeholderData: (previousData) => previousData,
    });
};