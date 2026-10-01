import { IQuery } from "@/hooks/profiles.hook";
import apiClient from "@/lib/apiClient";

export const getAllFaculties = async (params: IQuery) => {
    return await apiClient("/organization/faculties/all", {
        params,
    });
};
