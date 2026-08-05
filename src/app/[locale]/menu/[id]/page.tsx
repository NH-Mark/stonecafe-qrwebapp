"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MenuItem } from "@/src/types/menu";

import { getProduct } from "@/src/features/product/product.service";

import CustomerHeader from "@/src/components/CustomerHeader";
import ProductDetails from "@/src/features/product/components/ProductDetails";
import PageLoader from "@/src/components/common/PageLoader";
import { useLocale, useTranslations } from "next-intl";


export default function ProductPage(){


    const params = useParams();

    const id = params.id as string;



    const [product,setProduct] =
        useState<MenuItem | null>(null);



    const [loading,setLoading] =
        useState(true);

    const t = useTranslations("product");
    const locale = useLocale();



    useEffect(()=>{


        async function loadProduct(){


            try {


                const data =
                    await getProduct(id);


                setProduct(data);


            }

            finally {

                setLoading(false);

            }


        }


        if(id){

            loadProduct();

        }


    },[id]);

    if(loading){

        return (

            <PageLoader/>

        );

    }

    if(!product){

        return (

            <div

            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-[#f7f4ef]
            "
            >

                <p
                className="
                text-gray-500
                "
                >

                Product not found

                </p>


            </div>

        );

    }






    return (

        <main

        className="
        min-h-screen
        bg-[#f7f4ef]
        pb-10
        "

        >


            <CustomerHeader

                title={t("title")}

                backUrl={`/${locale}/menu`}

            />



            <div

            className="
            px-5
            "

            >


                <ProductDetails

                    product={product}

                />


            </div>



        </main>

    );


}