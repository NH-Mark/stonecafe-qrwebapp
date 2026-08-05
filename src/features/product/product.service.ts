import { apiClient } from "@/src/services/api";
import { MenuItem } from "@/src/types/menu";



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