"use client";

import { useCartStore } from "@/src/store/useCartStore";
import { imageUrl } from "@/src/utils/image";
import {
    Minus,
    Plus,
    Trash2
} from "lucide-react";


export default function OrderItems() {


    const {
        items,
        updateQty,
        removeItem
    } = useCartStore();



    return (

        <section
className="
bg-white
rounded-3xl
p-5
shadow-sm
"
>

    <h2 className="font-bold text-lg mb-4">
        Your Order
    </h2>


    <div
    className="
    max-h-[420px]
    overflow-y-auto
    pr-2
    space-y-1
    scrollbar-thin
    "
    >

    {
        items.map(item => (

            <div
            key={item.id}
            className="
            flex
            gap-3
            items-center
            py-4
            border-b
            last:border-none
            "
            >

                <img

                src={
                    imageUrl(item.image) || "/placeholder.png"
                }

                className="
                w-16
                h-16
                rounded-2xl
                object-cover
                flex-shrink-0
                "

                />



                <div
                className="
                flex-1
                min-w-0
                "
                >

                    <h3
                    className="
                    font-bold
                    truncate
                    "
                    >
                        {item.name}
                    </h3>


                    {
                    item.modifierNames?.length ?

                    <p
                    className="
                    text-xs
                    text-gray-500
                    truncate
                    "
                    >
                        {item.modifierNames.join(", ")}
                    </p>

                    :
                    null

                    }



                    <p
                    className="
                    text-sm
                    text-[#9b7653]
                    font-semibold
                    mt-1
                    "
                    >
                        {item.price.toFixed(2)} QAR
                    </p>


                </div>





                <div
                className="
                flex
                items-center
                gap-1
                "
                >


                    <button
                    onClick={()=>
                        updateQty(
                            item.id,
                            item.qty-1
                        )
                    }

                    className="
                    w-8
                    h-8
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    "
                    >

                        <Minus size={14}/>

                    </button>



                    <span
                    className="
                    w-5
                    text-center
                    font-bold
                    "
                    >
                        {item.qty}
                    </span>



                    <button

                    onClick={()=>
                        updateQty(
                            item.id,
                            item.qty+1
                        )
                    }

                    className="
                    w-8
                    h-8
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    "

                    >

                        <Plus size={14}/>

                    </button>



                    <button

                    onClick={()=>
                        removeItem(item.id)
                    }

                    className="
                    text-red-500
                    ml-1
                    "

                    >

                        <Trash2 size={17}/>

                    </button>


                </div>


            </div>


        ))
    }


    </div>


</section>

    )

}