"use client";

import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

import { MenuItem } from "@/types/menu";
import { CartModifier, useCartStore } from "@/src/store/useCartStore";


interface Props {

    product: MenuItem;

    quantity: number;

    setQuantity: (qty: number) => void;

    selectedModifiers:  CartModifier[];

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


    const addItem =
        useCartStore(
            state => state.addItem
        );





    return (


        <div

            className="
fixed
bottom-0
left-0
right-0
z-50

px-4
pb-4

flex
justify-center

"

        >


            <div

                className="
w-full
sm:max-w-md
md:max-w-xl

bg-white
rounded-3xl

shadow-2xl

p-3

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
gap-4

bg-[#efe5d9]

rounded-2xl

px-4

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
w-8
h-8
rounded-full

flex
items-center
justify-center

hover:bg-white/50

"

                    >

                        <Minus size={18} />

                    </button>





                    <span

                        className="
font-black
text-lg
"

                    >

                        {quantity}

                    </span>





                    <button

                        type="button"

                        onClick={() => setQuantity(quantity + 1)}

                        className="
w-8
h-8
rounded-full

flex
items-center
justify-center

hover:bg-white/50

"

                    >

                        <Plus size={18} />

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

                            qty: quantity,

                            price: Number(unitPrice),

                            modifiers: selectedModifiers,

                            image: product.image ?? undefined,


                            // modifierNames:

                            //     product.modifier_groups

                            //         ?.flatMap(
                            //             group => group.modifiers
                            //         )

                            //         .filter(
                            //             modifier =>
                            //                 selectedModifiers.includes(
                            //                     modifier.id
                            //                 )
                            //         )

                            //         .map(
                            //             modifier => modifier.name
                            //         )


                        });



                        router.push("/menu");


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


${disabled

                            ?

                            "bg-gray-300 text-gray-500"

                            :

                            "bg-[#40332a] text-white"

                        }


`}


                >


                    <span>

                        Add Item

                    </span>


                    <span

                        className="
font-black
"

                    >

                        {totalPrice.toFixed(2)} QAR

                    </span>


                </button>



            </div>



        </div>



    );


}   