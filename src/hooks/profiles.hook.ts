import { getAllUsers } from "@/api";
import { getAllStudents } from "@/api/profiles.api";
import { useQuery } from "@tanstack/react-query";




export interface IQuery {
    searchTerm?: string;
    page?: string; 
    limit?: string; 
    sortOrder?: string; 
    sortBy?: string; 
    [key: string]: any; 
}


export const useGetAllStudents = (params: IQuery) => {
    return useQuery({
        queryKey: ["profiles", "all", params],
        queryFn: () => getAllStudents(params),
        placeholderData: (previousData) => previousData,
    });
};