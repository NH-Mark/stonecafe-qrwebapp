"use client";

import { useParams } from "next/navigation";
import { XCircle, Coffee, RefreshCcw } from "lucide-react";


export default function OrderFailedPage() {

    const params = useParams();
    const retryPayment = async () => {

        try {

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/payments/skipcash/retry/${params.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );


            const data = await response.json();


            if (data.payment_url) {

                window.location.href = data.payment_url;

            }


        } catch (error) {

            console.log(error);

        }

    };


    return (

        <main className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-5">

            <div
                className="
                    w-full
                    max-w-md
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
                        "
                    >

                        <XCircle
                            className="
                                w-11
                                h-11
                                text-[#40332a]
                                stroke-[2.5]
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
                        Payment Failed
                    </h1>


                    <p
                        className="
                            mt-2
                            text-[#ddcfbe]
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        Something went wrong
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
                            text-center
                        "
                    >

                        <p
                            className="
                                text-[#40332a]
                                font-medium
                            "
                        >
                            We couldn't complete your payment.
                        </p>


                        <p
                            className="
                                mt-3
                                text-sm
                                text-[#a57650]
                            "
                        >
                            Order #{params.id}
                        </p>


                    </div>



                    <button
                        onClick={retryPayment}
                        className="
                            mt-8
                            w-full
                            rounded-xl
                            bg-[#a57650]
                            hover:bg-[#40332a]
                            text-white
                            py-4
                            font-semibold
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Try Payment Again
                    </button>


                    <button
                        onClick={() => {
                            window.location.href = "/";
                        }}
                        className="
                            mt-3
                            w-full
                            rounded-xl
                            border
                            border-[#c3b6a4]
                            text-[#40332a]
                            py-4
                            font-semibold
                            hover:bg-[#f3f3f3]
                            transition
                        "
                    >
                        Back To Home
                    </button>



                    <p
                        className="
                            text-center
                            mt-5
                            text-sm
                            text-[#c3b6a4]
                        "
                    >
                        Don't worry, your order is still saved
                    </p>


                </div>

            </div>

        </main>
    );
}