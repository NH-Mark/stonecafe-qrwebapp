"use client";

import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

import { MenuItem } from "@/src/types/menu";
import { CartModifier, useCartStore } from "@/src/store/useCartStore";
import { useLocale, useTranslations } from "next-intl";


interface Props {

    product: MenuItem;

    quantity: number;

    setQuantity: (qty: number) => void;

    selectedModifiers: CartModifier[];

    unitPrice: number;

    totalPrice: number;

    disabled?: boolean;

}



export default function AddToCartButton({

    product,
    quantity,
    setQuantity,
    selectedModifiers,
    unitPrice,
    totalPrice,
    disabled = false

}: Props) {


    const router = useRouter();

    const t = useTranslations("product");

    const locale = useLocale();
    const common = useTranslations('common');

    const addItem =
        useCartStore(
            state => state.addItem
        );



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


            <div

                className="
                    w-full

                    flex

                    gap-3
                "

            >



                {/* QUANTITY */}


                <div

                    className="
                        h-14

                        flex
                        items-center
                        gap-3

                        bg-[#f3f3f3]

                        border
                        border-[#d9d9d8]

                        rounded-2xl

                        px-3
                    "

                >


                    <button

                        type="button"

                        onClick={() =>
                            setQuantity(
                                Math.max(
                                    1,
                                    quantity - 1
                                )
                            )
                        }

                        className="
                            w-9
                            h-9

                            rounded-xl

                            bg-white

                            flex
                            items-center
                            justify-center

                            text-[#40332a]

                            shadow-sm

                            active:scale-95
                            transition
                        "

                    >

                        <Minus size={17}/>

                    </button>



                    <span

                        className="
                            min-w-5

                            text-center

                            font-black

                            text-lg

                            text-[#40332a]
                        "

                    >

                        {quantity}

                    </span>




                    <button

                        type="button"

                        onClick={() =>
                            setQuantity(quantity + 1)
                        }

                        className="
                            w-9
                            h-9

                            rounded-xl

                            bg-[#40332a]

                            text-white

                            flex
                            items-center
                            justify-center

                            active:scale-95
                            transition
                        "

                    >

                        <Plus size={17}/>

                    </button>


                </div>





                {/* ADD BUTTON */}



                <button


                    disabled={disabled}


                    onClick={() => {


                        addItem({

                            id: crypto.randomUUID(),

                            product_id: product.id,

                            name: product.name,

                            name_ar: product.name_ar,

                            qty: quantity,

                            price: Number(unitPrice),

                            modifiers: selectedModifiers,

                            image: product.image ?? undefined,

                        });



                        router.push(`/${locale}/menu`);

                    }}



                    className={`

                        flex-1

                        h-14

                        rounded-2xl

                        px-5

                        font-bold

                        flex
                        items-center
                        justify-between


                        transition

                        active:scale-[0.97]


                        ${
                            disabled
                                ? "bg-[#d9d9d8] text-[#8b7355] cursor-not-allowed"
                                : "bg-[#40332a] text-white shadow-lg hover:bg-[#30261f]"
                        }

                    `}

                >


                    <span>

                        {t("addItem")}

                    </span>



                    <span

                        className="
                            font-black
                            text-sm
                        "

                    >

                        {totalPrice.toFixed(2)} {common('qar')}

                    </span>


                </button>


            </div>


        </div>


    );

}