
import { IQuery } from "@/hooks/profiles.hook";
import apiClient from "@/lib/apiClient";


export const getAllStudents = async (params: IQuery) => {
    return await apiClient("/profiles/student/all", {
        params,
    });
};


