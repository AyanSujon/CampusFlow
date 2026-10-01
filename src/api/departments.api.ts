import { IQuery } from "@/hooks/profiles.hook";
import apiClient from "@/lib/apiClient";

export const getAllDepartments = async (params: IQuery) => {
    return await apiClient("/organization/departments/all", {
        params,
    });
};

export const createDepartment = async (payload: any) => {
    return await apiClient("/organization/departments/create", {method: "POST", body: payload} );
};

