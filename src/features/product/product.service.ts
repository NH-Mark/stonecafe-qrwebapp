import { apiClient } from "@/src/services/api";
import { MenuItem } from "@/types/menu";



export async function getProduct(
    id:string
){

    const response =
        await apiClient<{
            data:MenuItem
        }>(
            `/menu-items/${id}`
        );


    return response.data;
}