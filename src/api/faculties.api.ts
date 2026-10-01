import { IQuery } from "@/hooks/profiles.hook";
import apiClient from "@/lib/apiClient";

export const getAllFaculties = async (params: IQuery) => {
    return await apiClient("/organization/faculties/all", {
        params,
    });
};

export const createFaculty = async (payload: any) => {
    return await apiClient("/organization/faculties/create", {method: "POST", body: payload} );
};

