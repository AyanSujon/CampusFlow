import { createFaculty, getAllFaculties } from "@/api/faculties.api";
import { IQuery } from "./profiles.hook";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllFaculties = (params: IQuery) => {
    return useQuery({
        queryKey: ["organization", "faculties", params],
        queryFn: () => getAllFaculties(params),
        placeholderData: (previousData) => previousData,
    });
};


export function useCreateFaculty(){
    return useMutation({
        mutationFn: createFaculty,
    })
}