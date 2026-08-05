"use client";

import { ArrowRight } from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import { useTranslations } from "next-intl";

export default function CartSummary() {

    const common = useTranslations('common');

    const total = useCartStore(
        state => state.totalPrice()
    );

    const items = useCartStore(
        state => state.totalItems()
    );


    return (

        <div
            className="
fixed
bottom-0
left-1/2
-translate-x-1/2
w-full
max-w-[420px]
px-3
pb-3
z-50
"
        >

            <div
                className="
bg-white
border
border-[#eee7df]
rounded-2xl
shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
p-3
flex
items-center
gap-3
"
            >


                {/* TOTAL */}

                <div
                    className="
flex-1
"
                >

                    <p
                        className="
text-[11px]
text-gray-500
"
                    >
                        {items} Items
                    </p>


                    <p
                        className="
text-lg
font-bold
text-[#40332a]
leading-none
"
                    >
                        {Number(total).toFixed(2)} {common('qar')}
                    </p>

                </div>




                {/* CHECKOUT */}

                <button

                    className="
h-11
px-5
rounded-xl
bg-[#40332a]
text-white
text-sm
font-semibold
flex
items-center
gap-2
active:scale-95
transition
"

                >

                    Checkout

                    <ArrowRight
                        size={16}
                    />

                </button>


            </div>

        </div>

    );
}