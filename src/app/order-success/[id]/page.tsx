"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Coffee, ShoppingBag } from "lucide-react";
import PageLoader from "@/src/components/common/PageLoader";
import { useCartStore } from "@/src/store/useCartStore";


interface Order {
    id: number;
    order_no: string;
    payment_status: string;
    payment_reference: string | null;
    total: string;
}


export default function OrderSuccessPage() {

    const params = useParams();

    const [order, setOrder] = useState<Order | null>(null);
    const clearCart = useCartStore(
        state => state.clearCart
    );
    const cartCleared = useRef(false);

    useEffect(() => {

        if (!params.id) return;


        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
        )
            .then(res => res.json())
            .then(response => {

                const orderData = response.data;

                setOrder(orderData);


                if (
                    orderData.payment_status === "paid" &&
                    !cartCleared.current
                ) {

                    clearCart();

                    cartCleared.current = true;

                }

            });


    }, [params.id, clearCart]);


    if (!order) {
        return <PageLoader />;
    }


    return (

        <main className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-5">

            <div
                className="
                    w-full max-w-md
                    bg-white
                    rounded-3xl
                    shadow-xl
                    overflow-hidden
                "
            >

                {/* Header */}
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
                            relative
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
                        Payment Successful
                    </h1>


                    <p className="mt-2 text-[#ddcfbe] flex justify-center items-center gap-2">
                        Thank you for your order
                        <Coffee className="w-4 h-4" />
                    </p>

                </div>



                {/* Content */}
                <div className="p-8">


                    <div
                        className="
                            bg-[#f3f3f3]
                            rounded-2xl
                            p-5
                            space-y-4
                        "
                    >

                        <div className="flex justify-between">
                            <span className="text-[#a57650]">
                                Order No
                            </span>

                            <span className="font-semibold text-[#40332a]">
                                #{order.order_no}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-[#a57650]">
                                Amount
                            </span>

                            <span className="font-bold text-[#40332a]">
                                {order.total} QAR
                            </span>
                        </div>


                        <div className="flex justify-between items-center">
                            <span className="text-[#a57650]">
                                Status
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
                                <Check className="w-4 h-4" />
                                Paid
                            </span>
                        </div>


                    </div>



                    <button
                        onClick={() => {
                            window.location.href = "/";
                        }}
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
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                    </button>


                    <p
                        className="
                            text-center
                            mt-5
                            text-sm
                            text-[#c3b6a4]
                        "
                    >
                        We are preparing your delicious order
                    </p>


                </div>

            </div>

        </main>
    );
}