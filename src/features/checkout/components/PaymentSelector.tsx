"use client";

import { PaymentMethod } from "@/src/types/payment-method";
import {
    Banknote,
    CreditCard,
    QrCode,
    Smartphone,
    Wallet
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";


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

    const t = useTranslations('checkout');
    const locale = useLocale();
if (!methods.length) {
    return (
        <section className="bg-white rounded-3xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
                {t('loadingPaymentMethod')}
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
                {t('paymentMethod')}
            </h2>

            <div
                className="
                grid
                grid-cols-3
                gap-3
                "
            >

                {methods.map(method =>{
                    const method_name =
                                                locale === "ar"
                                                ? method.name_ar?.trim() || method.name
                                                : method.name;
                    return (
                    
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
                            {method_name}
                        </span>

                    </button>

                )})}

            </div>

        </section>

    );
}