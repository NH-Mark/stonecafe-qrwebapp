"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { imageUrl } from "@/src/utils/image";
import {
    CartItem,
    useCartStore
} from "@/src/store/useCartStore";
import { useTranslations } from "next-intl";

interface Props {
    item: CartItem;
}

export default function CartItemCard({
    item
}: Props) {

    const updateQty = useCartStore(state => state.updateQty);
    const removeItem = useCartStore(state => state.removeItem);
    const common = useTranslations('common');

    return (

        <div
            className="
bg-white
rounded-2xl
p-3
shadow-sm
border
border-[#f2ece5]
"
        >

            <div className="flex gap-3">

                {/* IMAGE */}

                <img

                    src={
                        item.image
                            ? imageUrl(item.image)
                            : "/placeholder-food.png"
                    }

                    className="
w-20
h-20
rounded-xl
object-cover
bg-gray-100
shrink-0
"

                />

                {/* CONTENT */}

                <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start gap-2">

                        <div className="min-w-0">

                            <h3
                                className="
font-semibold
text-base
text-[#40332a]
truncate
"
                            >
                                {item.name}
                            </h3>

                            <p
                                className="
text-xs
text-gray-400
mt-0.5
"
                            >
                                {Number(item.price).toFixed(2)}  {common('qar')} each
                            </p>

                        </div>

                        <button

                            onClick={() => removeItem(item.id)}

                            className="
w-8
h-8
rounded-lg
hover:bg-red-50
text-gray-400
hover:text-red-500
transition
flex
items-center
justify-center
"

                        >

                            <Trash2 size={16} />

                        </button>

                    </div>

                    {/* MODIFIERS */}

                    {
                        item.modifiers.length > 0 && (

                            <div
                                className="
mt-2
flex
flex-wrap
gap-1
"
                            >

                                {item.modifiers.map(modifier => (

                                    <span
                                        key={`${modifier.groupId}-${modifier.id}`}
                                        className="
px-2
py-0.5
rounded-full
bg-[#f6f2ed]
text-[11px]
text-[#7a6555]
"
                                    >
                                        {modifier.name}
                                    </span>

                                ))}

                            </div>

                        )
                    }

                    {/* FOOTER */}

                    <div
                        className="
mt-3
flex
items-center
justify-between
"
                    >

                        <span
                            className="
font-bold
text-lg
text-[#40332a]
"
                        >

                            {(Number(item.price) * item.qty).toFixed(2)} {common('qar')}

                        </span>

                        <div
                            className="
flex
items-center
bg-[#f6f1ea]
rounded-full
overflow-hidden
"
                        >

                            <button

                                onClick={() =>
                                    updateQty(
                                        item.id,
                                        item.qty - 1
                                    )
                                }

                                className="
w-8
h-8
flex
items-center
justify-center
"

                            >

                                <Minus size={14} />

                            </button>

                            <span
                                className="
w-7
text-center
text-sm
font-semibold
"
                            >

                                {item.qty}

                            </span>

                            <button

                                onClick={() =>
                                    updateQty(
                                        item.id,
                                        item.qty + 1
                                    )
                                }

                                className="
w-8
h-8
bg-[#40332a]
text-white
flex
items-center
justify-center
"

                            >

                                <Plus size={14} />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}