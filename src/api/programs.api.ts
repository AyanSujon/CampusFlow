import { IQuery } from "@/hooks/profiles.hook";
import apiClient from "@/lib/apiClient";

export const getAllPrograms = async (params: IQuery) => {
    return await apiClient("/organization/programs/all", {
        params,
    });
};

export const createProgram = async (payload: any) => {
    return await apiClient("/organization/programs/create", {method: "POST", body: payload} );
}   

