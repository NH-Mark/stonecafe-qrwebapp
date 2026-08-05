"use client";

import CustomerHeader from "@/src/components/CustomerHeader";
import CartItemCard from "@/src/features/cart/components/CartItemCard";
import CartSummary from "@/src/features/cart/components/CartSummary";
import { useCartStore } from "@/src/store/useCartStore";

export default function CartPage() {

    const items = useCartStore(state => state.items);

    return (

        <div className="min-h-screen bg-[#faf8f5] pb-40">

            <CustomerHeader
                                title="CART"
                                backUrl="/menu"
                            />

            <div className="p-4 space-y-3">

                {
                    items.length === 0 ?

                        <div className="py-24 text-center text-gray-500">

                            Your cart is empty

                        </div>

                        :

                        items.map(item => (

                            <CartItemCard
                                key={item.id}
                                item={item}
                            />

                        ))
                }

            </div>

            {
                items.length > 0 &&

                <CartSummary />

            }

        </div>

    );

}