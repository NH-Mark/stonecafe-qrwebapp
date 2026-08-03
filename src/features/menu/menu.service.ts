

import { apiClient } from "@/src/services/api";
import { Category } from "@/types/category";
import { MenuItem } from "@/types/menu";



export async function getCategories(){

    const response =
        await apiClient<{
            data: Category[]
        }>("/categories");


    return response.data;

}


export async function getMenu(){

    const response =
        await apiClient<{
            data: MenuItem[]
        }>("/menu");


    return response.data;

}