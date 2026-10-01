
import { createInstructorProfile, getAllInstructors, getAllStudents } from "@/api/profiles.api";
import { useMutation, useQuery } from "@tanstack/react-query";




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


export const useGetAllInstructors = (params: IQuery) => {
    return useQuery({
        queryKey: ["profiles", "instructors", params],
        queryFn: () => getAllInstructors(params),
        placeholderData: (previousData) => previousData,
    });
};




export function useCreateInstructor(){
    return useMutation({
        mutationFn: createInstructorProfile,
    })
}