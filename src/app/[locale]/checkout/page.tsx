"use client";

import {
    useState
} from "react";

import Link from "next/link";

import {
    useSearchParams
} from "next/navigation";

import {
    useCartStore
} from "@/src/store/useCartStore";

import {
    toast
} from "sonner";

import OrderItems from "@/src/features/checkout/components/OrderItems";
import CustomerForm from "@/src/features/checkout/components/CustomerForm";
import CheckoutSummary from "@/src/features/checkout/components/CheckoutSummary";
import CustomerHeader from "@/src/components/CustomerHeader";

import {
    createCustomerOrder,
    findCustomerByPhone
} from "@/src/features/checkout/checkout.service";

import {
    useOrderStore
} from "@/src/store/store";

import {
    Customer
} from "@/src/types/customer";

import {
    useLocale,
    useTranslations
} from "next-intl";

export default function CheckoutPage() {

    const [loading, setLoading] =
        useState(false);

    const t =
        useTranslations("checkout");

    const locale =
        useLocale();

    const searchParams =
        useSearchParams();

    /*
    |--------------------------------------------------------------------------
    | Table ID
    |--------------------------------------------------------------------------
    */

    const tableId =
        searchParams.get("table_id");

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

    const subtotal =
        totalPrice();

    const total =
        subtotal;

    /*
    |--------------------------------------------------------------------------
    | Customer
    |--------------------------------------------------------------------------
    */

    function updateCustomer(
        key: keyof Customer,
        value: string
    ) {

        setCustomer(prev => ({
            ...prev,
            [key]: value
        }));

    }

    /*
    |--------------------------------------------------------------------------
    | Order Type
    |--------------------------------------------------------------------------
    */

    const orderType =
        useOrderStore(
            state => state.type
        );

    /*
    |--------------------------------------------------------------------------
    | Place Order
    |--------------------------------------------------------------------------
    */

    async function placeOrder() {

        if (loading) {
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Table validation
        |--------------------------------------------------------------------------
        */

        // if (!tableId) {

        //     toast.error(
        //         "Table information is missing."
        //     );

        //     return;
        // }

        /*
        |--------------------------------------------------------------------------
        | Customer is OPTIONAL
        |--------------------------------------------------------------------------
        */

        if (
            customer.phone &&
            customer.phone.length !== 8
        ) {

            toast.error(
                "Enter valid Qatar mobile number"
            );

            return;
        }

        setLoading(true);

        try {

            const payload = {

                table_id: tableId ? Number(tableId) : null,

                customer:
                    customer.name ||
                    customer.phone
                        ? {
                            name:
                                customer.name || null,

                            phone:
                                customer.phone
                                    ? `974${customer.phone}`
                                    : null,

                            note:
                                customer.note || null
                        }
                        : null,

                items,

                order_type:
                    orderType,

                subtotal,

                total_amount:
                    total,

                notes:
                    customer.note || null
            };

            const response =
                await createCustomerOrder(
                    payload
                );

            const order =
                response.data;

            clearCart();

            window.location.href =
                `/${locale}/order-success/${order.id}`;

        }
        catch (error) {

            console.error(error);

            toast.error(
                "Could not place order"
            );

        }
        finally {

            setLoading(false);

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Empty Cart
    |--------------------------------------------------------------------------
    */

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

                    <div className="text-5xl">
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
                        {t("cartEmptyMsg")}
                    </h1>

                    <p
                        className="
                            text-gray-500
                            mt-2
                        "
                    >
                        {t("cartEmptyDesc")}
                    </p>

                    <Link
                        href={
                            tableId
                                ? `/${locale}/menu?table_id=${tableId}`
                                : `/${locale}/menu`
                        }
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
                        {t("browseMenu")}
                    </Link>

                </div>

            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Checkout
    |--------------------------------------------------------------------------
    */

    return (

        <main
            className="
                min-h-screen
                bg-[#faf7f2]
                pb-28
            "
        >

            <CustomerHeader
                title={t("title")}
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

            </div>

            <CheckoutSummary
                total={total}
                placeOrder={placeOrder}
                loading={loading}
            />

        </main>
    );
}