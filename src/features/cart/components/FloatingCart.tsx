"use client";

import Link from "next/link";

import {
    ShoppingCart,
    ArrowLeft,
    ArrowRight
} from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";


interface Props {

    items: number;

    total: number;

}



export default function FloatingCart({

    items,
    total

}: Props) {


    const locale = useLocale();

    const t = useTranslations("cart");


    const Arrow =
        locale === "ar"
            ? ArrowLeft
            : ArrowRight;



    return (

        <div

            className="
                fixed

                bottom-0

                left-1/2

                -translate-x-1/2


                w-full

                sm:max-w-md
                md:max-w-xl
                lg:max-w-2xl


                z-50


                bg-white


                border-t
                border-[#d9d9d8]


                px-4

                pt-3


                pb-[max(env(safe-area-inset-bottom),16px)]


                shadow-[0_-6px_25px_rgba(64,51,42,0.12)]
            "

        >



            <Link

                href={`/${locale}/checkout`}

                className="
                    block
                    w-full
                "

            >


                <div

                    className="
                        h-16


                        bg-[#40332a]


                        rounded-2xl


                        px-4


                        flex
                        items-center
                        justify-between


                        text-white


                        active:scale-[0.98]

                        transition
                    "

                >



                    {/* LEFT */}


                    <div

                        className="
                            flex
                            items-center
                            gap-3
                        "

                    >



                        <div

                            className="
                                w-11
                                h-11


                                rounded-2xl


                                bg-[#a5765a]


                                flex
                                items-center
                                justify-center
                            "

                        >

                            <ShoppingCart size={21}/>


                        </div>




                        <div
                            className="
                                leading-tight
                            "
                        >


                            <p

                                className="
                                    font-bold
                                    text-sm
                                "

                            >

                                {items}{" "}

                                {items === 1
                                    ? t('item')
                                    : t('items')
                                }

                            </p>



                            <p

                                className="
                                    text-xs
                                    text-[#ddcfbe]
                                "

                            >

                                {t('viewCart')}

                            </p>



                        </div>



                    </div>






                    {/* RIGHT */}



                    <div

                        className="
                            flex
                            items-center
                            gap-3
                        "

                    >


                        <span

                            className="
                                font-black
                                text-sm
                            "

                        >

                            {total.toFixed(2)} QAR


                        </span>




                        <div

                            className="
                                w-9
                                h-9


                                rounded-full


                                bg-[#ddcfbe]


                                text-[#40332a]


                                flex
                                items-center
                                justify-center
                            "

                        >

                            <Arrow size={18}/>


                        </div>


                    </div>



                </div>


            </Link>



        </div>


    );

}