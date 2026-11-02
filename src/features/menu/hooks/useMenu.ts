"use client";


import { Category } from "@/src/types/category";
import { MenuItem } from "@/src/types/menu";
import {
    useEffect,
    useState
} from "react";
import { getCategories, getMenu } from "../menu.service";



export function useMenu(
    locationId?: string
) {


    const [categories, setCategories]
        =
        useState<Category[]>([]);


    const [menu, setMenu]
        =
        useState<MenuItem[]>([]);


    const [loading, setLoading]
        =
        useState(true);



    useEffect(() => {


        async function load() {


            try {


                const [
                    categoriesData,
                    menuData

                ] = await Promise.all([
                    getCategories(locationId),
                    getMenu(locationId)
                ]);

                setCategories(
                    categoriesData
                );


                setMenu(
                    menuData
                );



            }
            finally {

                setLoading(false);

            }


        }


        load();


    }, [locationId]);



    return {

        categories,

        menu,

        loading

    };


}