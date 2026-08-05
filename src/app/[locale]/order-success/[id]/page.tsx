"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Coffee, Home, ShoppingBag } from "lucide-react";

import PageLoader from "@/src/components/common/PageLoader";
import { useCartStore } from "@/src/store/useCartStore";
import { useLocale, useTranslations } from "next-intl";


interface Order {
    id: number;
    order_no: string;
    payment_status: string;
    payment_reference: string | null;
    total: string;
    payment_method: string;
}


export default function OrderSuccessPage() {

    const params = useParams();
     const t = useTranslations('checkout');
    const locale = useLocale();


    const [order, setOrder] =
        useState<Order | null>(null);


    const clearCart =
        useCartStore(
            state => state.clearCart
        );


    const cartCleared =
        useRef(false);



    useEffect(() => {

        if (!params.id) return;


        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
        )
        .then(res => res.json())
        .then(response => {

            const orderData =
                response.data;


            setOrder(orderData);



            if (
                !cartCleared.current
            ) {

                clearCart();

                cartCleared.current = true;

            }


        });


    }, [
        params.id,
        clearCart
    ]);




    if (!order) {

        return <PageLoader />;

    }



    const isCard =
        order.payment_method === "SKIPCASH";

   
    return (

        <main
            className="
                min-h-screen
                bg-[#f3f3f3]
                flex
                items-center
                justify-center
                px-5
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-3xl
                    shadow-xl
                    overflow-hidden
                "
            >


                <div
                    className="
                        bg-[#40332a]
                        px-8
                        py-10
                        text-center
                    "
                >

                    <div
                        className="
                            mx-auto
                            w-20
                            h-20
                            rounded-full
                            bg-[#ddcfbe]
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <Check
                            className="
                                w-10
                                h-10
                                text-[#40332a]
                                stroke-[3]
                            "
                        />

                    </div>



                    <h1
                        className="
                            mt-5
                            text-3xl
                            font-bold
                            text-white
                        "
                    >
                        {
                            isCard
                                ? t('paymentSuccessfull')
                                : t('orderConfirmed')
                        }
                    </h1>



                    <p
                        className="
                            mt-2
                            text-[#ddcfbe]
                            flex
                            justify-center
                            items-center
                            gap-2
                        "
                    >

                       {t('thanksMsg')}

                        <Coffee
                            className="w-4 h-4"
                        />

                    </p>


                </div>





                <div className="p-8">


                    <div
                        className="
                            bg-[#f3f3f3]
                            rounded-2xl
                            p-5
                            space-y-4
                        "
                    >


                        <div
                            className="
                                flex
                                justify-between
                            "
                        >

                            <span
                                className="
                                    text-[#a57650]
                                "
                            >
                               {t('orderNo')}
                            </span>


                            <span
                                className="
                                    font-semibold
                                    text-[#40332a]
                                "
                            >
                                #{order.order_no}
                            </span>

                        </div>





                        <div
                            className="
                                flex
                                justify-between
                            "
                        >

                            <span
                                className="
                                    text-[#a57650]
                                "
                            >
                                {t('amount')}
                            </span>


                            <span
                                className="
                                    font-bold
                                    text-[#40332a]
                                "
                            >
                                {order.total} QAR
                            </span>

                        </div>






                        <div
                            className="
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <span
                                className="
                                    text-[#a57650]
                                "
                            >
                                {t('status')}
                            </span>



                            <span
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium
                                    bg-[#ddcfbe]
                                    text-[#40332a]
                                "
                            >

                                <Check
                                    className="w-4 h-4"
                                />


                                {
                                    isCard
                                        ? "Paid"
                                        : "Confirmed"
                                }


                            </span>


                        </div>



                    </div>






                    <button

                        onClick={() =>
                            window.location.href =  `/${locale}`
                        }

                        className="
                            mt-8
                            w-full
                            rounded-xl
                            bg-[#a57650]
                            hover:bg-[#40332a]
                            text-white
                            py-4
                            font-semibold
                            transition
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >

                        <Home
                            className="w-5 h-5"
                        />

                        {t('backToHome')}

                    </button>





                    <p
                        className="
                            text-center
                            mt-5
                            text-sm
                            text-[#c3b6a4]
                        "
                    >

                        {t('successDesc')}

                    </p>


                </div>


            </div>


        </main>

    );
}