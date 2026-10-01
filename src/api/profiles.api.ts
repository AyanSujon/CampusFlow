
import { IQuery } from "@/hooks/profiles.hook";
import apiClient from "@/lib/apiClient";


export const getAllStudents = async (params: IQuery) => {
    return await apiClient("/profiles/student/all", {
        params,
    });
};

export const getAllInstructors = async (params: IQuery) => {
    return await apiClient("/profiles/instructors/all", {
        params
    });
};


export const createInstructorProfile = async (payload: any) => {
    return await apiClient("/profiles/instructors/create-profile", {method: "POST", body: payload} );
};


