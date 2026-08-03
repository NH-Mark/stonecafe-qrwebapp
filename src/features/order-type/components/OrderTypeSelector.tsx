"use client";

import { useRouter } from "next/navigation";
import { useOrderStore } from "../../../store/store";
import { ArrowRight, ShoppingBag, UtensilsCrossed } from "lucide-react";

export default function OrderTypeSelector() {

    const router = useRouter();

    const setType = useOrderStore(
        state => state.setType
    );


    function select(type: "dine_in" | "takeaway") {

        setType(type);

        router.push("/menu");

    }


    return (
        <div className="min-h-screen bg-[#f3f3f3] flex justify-center">
            <div className="w-full max-w-md">

                {/* Hero */}
                <div className="relative h-64 flex items-center justify-center">
                    <img src="/logo.png" className="w-40" alt="Logo" />
                </div>

                <div className="px-5 -mt-10">

                    <h3 className="text-center mt-8 mb-6 text-[#40332a] text-lg font-semibold">
                        How would you like to order?
                    </h3>

                    {/* Cards */}
                    <div className="grid grid-cols-2 gap-5">

                        {/* DINE IN */}
                        <div
                            onClick={() => select("dine_in")}
                            className="cursor-pointer bg-white rounded-[30px] shadow-lg p-6 transition hover:-translate-y-1 active:scale-95"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#efe5d9] flex items-center justify-center mx-auto">
                                <UtensilsCrossed size={38} color="#40332a" />
                            </div>

                            <h2 className="mt-6 text-xl text-center font-bold text-[#40332a]">
                                DINE IN
                            </h2>

                            <p className="mt-2 text-center text-sm text-gray-500">
                                Enjoy your meal in our café
                            </p>

                            <div className="flex justify-center mt-7">
                                <div className="w-12 h-12 rounded-full bg-[#40332a] flex items-center justify-center">
                                    <ArrowRight color="white" />
                                </div>
                            </div>
                        </div>

                        {/* TAKE AWAY */}
                        <div
                            onClick={() => select("takeaway")}
                            className="cursor-pointer bg-white rounded-[30px] shadow-lg p-6 transition hover:-translate-y-1 active:scale-95"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#eef3ea] flex items-center justify-center mx-auto">
                                <ShoppingBag size={38} color="#40332a" />
                            </div>

                            <h2 className="mt-6 text-xl text-center font-bold text-[#40332a]">
                                TAKE AWAY
                            </h2>

                            <p className="mt-2 text-center text-sm text-gray-500">
                                Order food to take away
                            </p>

                            <div className="flex justify-center mt-7">
                                <div className="w-12 h-12 rounded-full bg-[#40332a] flex items-center justify-center">
                                    <ArrowRight color="white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}