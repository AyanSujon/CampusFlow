
import { IQuery } from "./profiles.hook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProgram, getAllPrograms } from "@/api/programs.api";

export const useGetAllPrograms = (params: IQuery) => {
    return useQuery({
        queryKey: ["organization", "programs", params],
        queryFn: () => getAllPrograms(params),
        placeholderData: (previousData) => previousData,
    });
};


export function useCreateProgram(){
    return useMutation({
        mutationFn: createProgram,
    })
}

