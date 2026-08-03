"use client";

import {
    useEffect,
    useState
} from "react";

import Link from "next/link";

import {
    useCartStore
} from "@/src/store/useCartStore";

import {
    toast
} from "sonner";


import OrderItems from "@/src/features/checkout/components/OrderItems";
import CustomerForm from "@/src/features/checkout/components/CustomerForm";
import PaymentSelector from "@/src/features/checkout/components/PaymentSelector";
import CheckoutSummary from "@/src/features/checkout/components/CheckoutSummary";
import CustomerHeader from "@/src/components/CustomerHeader";

import {
    usePaymentMethods
} from "@/src/features/checkout/hooks/usePaymentMethods";
import { createCustomerOrder, findCustomerByPhone } from "@/src/features/checkout/checkout.service";
import { useOrderStore } from "@/src/store/store";
import { Customer } from "@/types/customer";
import { useRouter } from "next/router";

export default function CheckoutPage() {
    const [loading, setLoading] = useState(false);

    const {
        methods
    } = usePaymentMethods();



    const [payment, setPayment] =
        useState("");



    const {
        items,
        totalPrice,
        clearCart
    } = useCartStore();

    const [customer, setCustomer] =
        useState<Customer>({

            name: "",
            phone: "",
            note: ""

        });
    useEffect(() => {


        if (!payment && methods.length) {

            setPayment(
                methods[0].code
            );

        }


    }, [
        methods,
        payment
    ]);
    const subtotal =
        totalPrice();



    // const vat =
    subtotal * 0.05;



    const total =
        subtotal;





    function updateCustomer(
        key: keyof Customer,
        value: string
    ) {

        setCustomer(prev => ({

            ...prev,

            [key]: value

        }));

    }




    const orderType =
        useOrderStore(
            state => state.type
        );

    async function placeOrder() {
        if (loading) return;


        if (customer.phone.length !== 8) {

            toast.error(
                "Enter valid Qatar mobile number"
            );

            return;

        }


        if (!customer.name.trim()) {

            toast.error(
                "Enter customer name"
            );

            return;

        }



        if (!payment) {

            toast.error(
                "Select payment method"
            );

            return;

        }
        setLoading(true);




        try {


            const payload = {


                customer: {

                    name: customer.name,

                    phone:
                        `974${customer.phone}`

                },


                items,



                payment: {


                    payment_method_id:
                        methods.find(
                            m => m.code === payment
                        )?.id,


                    amount: total


                },


                order_type: orderType,
                subtotal,



                total_amount: total,


                notes: customer.note


            };


            const response =
                await createCustomerOrder(payload);


            const order =
                response.data;
            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            if (payment === "SKIPCASH") {

                const response =
                    await fetch(
                        `${API_URL}/payments/skipcash`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({

                                order_id: order.id

                            })

                        }
                    );


                const data =
                    await response.json();



                window.location.href =
                    data.payment_url;


                return;

            }



            window.location.href =
            `/order-success/${order.id}`;



                }
                catch (error) {

                    toast.error(
                        "Could not place order"
                    );

                }finally {

                    setLoading(false);
                    

                }



            }







    if (items.length === 0) {


        return (

            <main
                className="
            min-h-screen
            bg-[#faf7f2]
            flex
            items-center
            justify-center
            p-5
            "
            >

                <div
                    className="
                bg-white
                rounded-3xl
                p-8
                text-center
                max-w-sm
                w-full
                shadow-sm
                "
                >


                    <div
                        className="
                    text-5xl
                    "
                    >
                        🛒
                    </div>


                    <h1
                        className="
                    mt-5
                    font-black
                    text-xl
                    text-[#40332a]
                    "
                    >
                        Your Cart is Empty
                    </h1>


                    <p
                        className="
                    text-gray-500
                    mt-2
                    "
                    >
                        Add delicious items from our menu
                    </p>



                    <Link
                        href="/menu"
                        className="
                    mt-6
                    block
                    bg-[#40332a]
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    "
                    >
                        Browse Menu
                    </Link>


                </div>


            </main>

        );

    }






    return (

        <main
            className="
        min-h-screen
        bg-[#faf7f2]
        pb-28
        "
        >


            <CustomerHeader

                title="CHECKOUT"

                backUrl="/menu"



            />



            <div
                className="
            p-4
            space-y-5
            "
            >


                <OrderItems />



                <CustomerForm

                    customer={customer}

                    updateCustomer={updateCustomer}

                    lookupCustomer={
                        findCustomerByPhone
                    }

                />




                <PaymentSelector

                    methods={methods}

                    payment={payment}

                    setPayment={setPayment}

                />


            </div>




            <CheckoutSummary
                total={total}
                placeOrder={placeOrder}
                loading={loading}

            />



        </main>

    );

}