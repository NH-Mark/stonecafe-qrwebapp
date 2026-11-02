

import { apiClient } from "@/src/services/api";
import { Category } from "@/src/types/category";
import { MenuItem } from "@/src/types/menu";



export async function getCategories(
    locationId?: string
){

    const params =
        new URLSearchParams();

    if (locationId) {
        params.set(
            "location_id",
            locationId
        );
    }

    const endpoint =
        `/categories${
            params.toString()
                ? `?${params.toString()}`
                : ""
        }`;

    const response =
        await apiClient<{
            data: Category[]
        }>(endpoint);


    return response.data;

}


export async function getMenu(
    locationId?: string
){

    const params =
        new URLSearchParams();

    if (locationId) {
        params.set(
            "location_id",
            locationId
        );
    }

    const endpoint =
        `/menu${
            params.toString()
                ? `?${params.toString()}`
                : ""
        }`;

    const response =
        await apiClient<{
            data: MenuItem[]
        }>(endpoint);


    return response.data;

}