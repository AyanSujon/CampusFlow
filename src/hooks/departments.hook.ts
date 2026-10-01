
import { createDepartment, getAllDepartments } from "@/api/departments.api";
import { IQuery } from "./profiles.hook";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllDepartments = (params: IQuery) => {
    return useQuery({
        queryKey: ["organization", "departments", params],
        queryFn: () => getAllDepartments(params),
        placeholderData: (previousData) => previousData,
    });
};


export function useCreateDepartment(){
    return useMutation({
        mutationFn: createDepartment,
    })
}