"use client";

import { ArrowRight, Loader2 } from "lucide-react";

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

pointer-events-none

"

        >
            <div

                className="
mx-auto

w-full

sm:max-w-md
md:max-w-xl

bg-white

rounded-3xl

shadow-[0_-8px_30px_rgba(0,0,0,0.08)]

border
border-[#eee7df]

p-3

pointer-events-auto

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
px-3

"

                    >


                        <p

                            className="
text-xs
text-gray-500
font-medium
"

                        >

                            Total Amount

                        </p>


                        <p

                            className="
text-xl
font-black
text-[#40332a]
"

                        >

                            {total.toFixed(2)}

                            <span className="text-sm ml-1">

                                QAR

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
shadow-lg
transition

${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#40332a] text-white active:scale-95"}
`}
                    >

                        {loading ? (

                            <>

                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />

                                <span>
                                    Placing Order...
                                </span>

                            </>

                        ) : (

                            <>

                                <span>
                                    Place Order
                                </span>

                                <ArrowRight size={18} />

                            </>

                        )}

                    </button>



                </div>


            </div>


        </div>


    );


}