"use client";

import { PaymentMethod } from "@/types/payment-method";
import {
    Banknote,
    CreditCard,
    QrCode,
    Smartphone,
    Wallet
} from "lucide-react";


interface Props {
    methods: PaymentMethod[];
    payment: string;
    setPayment: (value: string) => void;
}

function getIcon(icon?: string) {

    switch (icon) {

        case "CASH":
            return <Banknote size={22} />;

        case "CARD":
            return <CreditCard size={22} />;

        case "APPLE_PAY":
            return <Smartphone size={22} />;

        case "WALLET":
            return <Wallet size={22} />;

        case "QR":
            return <QrCode size={22} />;

        default:
            return <CreditCard size={22} />;
    }
}

export default function PaymentSelector({

    methods,
    payment,
    setPayment

}: Props) {
if (!methods.length) {
    return (
        <section className="bg-white rounded-3xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
                Loading payment methods...
            </p>
        </section>
    );
}
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
                Payment Method
            </h2>

            <div
                className="
                grid
                grid-cols-3
                gap-3
                "
            >

                {methods.map(method => (

                    <button

                        key={method.id}

                        type="button"

                        onClick={() => setPayment(method.code)}

                        className={`
                        rounded-2xl
                        p-4
                        transition-all
                        border
                        flex
                        flex-col
                        items-center
                        gap-3

                        ${
                            payment === method.code
                                ? "bg-[#40332a] text-white border-[#40332a]"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }
                        `}

                    >

                        {getIcon(method.code)}

                        <span className="text-sm font-semibold">
                            {method.name}
                        </span>

                    </button>

                ))}

            </div>

        </section>

    );
}