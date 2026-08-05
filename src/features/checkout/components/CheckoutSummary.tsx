"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";


interface Props {

    total: number;

    placeOrder: () => void;

    loading: boolean;

}



export default function CheckoutSummary({

    total,

    placeOrder,

    loading

}: Props) {

    const t = useTranslations('checkout');
    const locale = useLocale();
    const common = useTranslations('common');
    
    const Arrow = locale === "ar"
        ? ChevronLeft
        : ChevronRight;

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


                px-4

                pt-3

                pb-[max(env(safe-area-inset-bottom),16px)]


                bg-white

                border-t
                border-[#d9d9d8]


                shadow-[0_-6px_25px_rgba(64,51,42,0.12)]
            "

        >


            <div

                className="
                    w-full

                    bg-white

                    rounded-3xl

                    border
                    border-[#eee7df]

                    shadow-sm

                    p-3
                "

            >


                <div

                    className="
                        flex
                        items-center
                        gap-3
                    "

                >



                    {/* TOTAL */}


                    <div

                        className="
                            flex-1
                            px-2
                        "

                    >


                        <p

                            className="
                                text-xs
                                text-[#8b7355]
                                font-medium
                            "

                        >

                             {t('totalAmount')}

                        </p>



                        <p

                            className="
                                text-xl
                                font-black
                                text-[#40332a]
                                pl-2
                            "

                        >

                            {total.toFixed(2)}

                            <span

                                className="
                                    text-sm
                                    ml-1
                                    mr-1
                                    font-bold
                                "

                            >

                                {common('qar')}

                            </span>


                        </p>


                    </div>





                    {/* BUTTON */}


                    <button
                        onClick={placeOrder}
                        disabled={loading}
                        className={`
        h-14
        px-6
        rounded-2xl

        font-black
        text-base

        flex
        items-center
        justify-center

        gap-2

        transition

        active:scale-[0.97]

        ${loading
                                ? "bg-[#d9d9d8] text-[#8b7355] cursor-not-allowed"
                                : "bg-[#40332a] text-white shadow-lg hover:bg-[#30261f]"
                            }
    `}
                    >


                        {

                            loading

                                ?

                                <>

                                    <Loader2

                                        size={18}

                                        className="animate-spin"

                                    />


                                    <span>

                                         {t('placing')}

                                    </span>


                                </>

                                :

                                <>

                                    <span>

                                        {t('placeOrder')}

                                    </span>


                                    <Arrow

                                        size={18}

                                    />

                                </>

                        }


                    </button>



                </div>


            </div>


        </div>


    );

}