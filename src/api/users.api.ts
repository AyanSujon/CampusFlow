import { GetAllUsersParams } from "@/hooks/users.hook";
import apiClient from "@/lib/apiClient";


export const getAllUsers = async (params: GetAllUsersParams) => {
    return await apiClient("/users/all", {
        params,
    });
};


