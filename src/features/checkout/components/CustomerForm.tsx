"use client";

import { useEffect, useState } from "react";
import {
    User,
    Phone,
    MessageSquare,
    Loader2,
    BadgeCheck,
    Gift,
    UserPlus
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import {
    Customer,
    CustomerLookup
} from "@/src/types/customer";
import { useLocale, useTranslations } from "next-intl";


interface Props {

    customer: Customer;

    updateCustomer: (
        key: keyof Customer,
        value: string
    ) => void;


    lookupCustomer?: (
        phone: string
    ) => Promise<CustomerLookup | null>;

}



export default function CustomerForm({

    customer,
    updateCustomer,
    lookupCustomer

}: Props) {

    const t = useTranslations("checkout");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [checking, setChecking] =
        useState(false);


    const [member, setMember] =
        useState<CustomerLookup | null>(null);


    const [notMember, setNotMember] =
        useState(false);



    useEffect(() => {


        async function checkCustomer() {


            if (!lookupCustomer) return;


            if (
                !customer.phone ||
                customer.phone.length !== 8
            ) {

                setMember(null);
                setNotMember(false);

                return;

            }



            try {


                setChecking(true);



                const result =
                    await lookupCustomer(
                        `974${customer.phone}`
                    );



                if (result) {


                    setMember(result);

                    setNotMember(false);



                    updateCustomer(
                        "name",
                        result.name ?? ""
                    );


                } else {


                    setMember(null);

                    setNotMember(true);


                }



            } catch (error) {


                setMember(null);
                setNotMember(false);


            }
            finally {


                setChecking(false);


            }


        }



        checkCustomer();



    }, [
        customer.phone
    ]);





    return (


        <Card
            className="
            rounded-3xl
            border-none
            shadow-sm
            "
        >


            <CardHeader>

                <CardTitle>
                    {t('customerTitle')}
                </CardTitle>

            </CardHeader>




            <CardContent
                className="
                space-y-5
                "
            >



                {/* PHONE */}


                <div className="space-y-2">

    <label
        dir="auto"
        className="block text-sm font-medium text-start"
    >
        {t("mobNo")}
    </label>

    <div className="flex flex-row" dir="ltr">

        {/* Country Code */}
        <div
            className="
                h-12
                px-4
                rounded-l-2xl
                border
                border-r-0
                bg-muted
                flex
                items-center
                justify-center
                font-bold
                whitespace-nowrap
            "
        >
            +974
        </div>

        {/* Phone Input */}
        <div className="relative flex-1">

            <Phone
                size={18}
                className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                "
            />

            <Input
                type="tel"
                inputMode="numeric"
                maxLength={8}
                dir="ltr"
                placeholder="55123456"
                value={customer.phone ?? ""}
                onChange={(e) =>
                    updateCustomer(
                        "phone",
                        e.target.value.replace(/\D/g, "")
                    )
                }
                className="
                    h-12
                    rounded-l-none
                    rounded-r-2xl
                    pl-10
                    pr-10
                    text-left
                "
            />

        </div>

    </div>

</div>

                {
                    member &&


                    <div

                        className="
                        rounded-2xl
                        border
                        border-green-200
                        bg-green-50
                        p-4
                        "

                    >


                        <div
                            className="
                            flex
                            items-center
                            gap-2
                            "
                        >


                            <BadgeCheck

                                size={20}

                                className="
                                text-green-600
                                "

                            />


                            <span
                                className="
                                font-bold
                                text-green-700
                                "
                            >

                                {t('returningCustomer')}

                            </span>


                        </div>



                        <p
                            className="
                            mt-3
                            font-black
                            "
                        >

                            {member.name ?? t('customer')}

                        </p>



                        <div
                            className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-amber-700
                            "
                        >


                            <Gift size={18} />


                            <span
                                className="
                                font-bold
                                "
                            >

                                {
                                    member.loyalty_points ??
                                    0
                                }

                                {" "} {t('rewardPoints')}


                            </span>


                        </div>


                    </div>


                }






                {/* NEW CUSTOMER */}


                {
                    notMember &&


                    <div

                        className="
                        rounded-2xl
                        border
                        border-blue-200
                        bg-blue-50
                        p-4
                        "

                    >


                        <div
                            className="
                            flex
                            items-center
                            gap-2
                            "
                        >


                            <UserPlus

                                size={20}

                                className="
                                text-blue-600
                                "

                            />


                            <span
                                className="
                                font-bold
                                text-blue-700
                                "
                            >

                                {t('newCustomer')}

                            </span>


                        </div>



                        <p
                            className="
                            mt-2
                            text-sm
                            text-blue-700
                            "
                        >

                            {t('newCusDesc')}

                        </p>


                    </div>


                }







                {/* NAME */}


                <div
                    className="
                    space-y-2
                    "
                >


                    <label
                        className="
                        text-sm
                        font-medium
                        "
                    >

                        {t('fullName')}

                    </label>



                    <div
                        className="
                        relative
                        "
                    >


                        <User

                            size={18}

                            className="
                            absolute
                            left-3
                            top-3.5
                            text-muted-foreground
                            "

                        />



                        <Input


                            placeholder={t('customerName')}


                            value={
                                customer.name ?? ""
                            }


                            onChange={(e) =>

                                updateCustomer(
                                    "name",
                                    e.target.value
                                )

                            }


                            className="
                            h-12
                            rounded-2xl
                            pl-10
                            "

                        />


                    </div>


                </div>








                {/* NOTE */}



                <div
                    className="
                    space-y-2
                    "
                >


                    <label
                        className="
                        text-sm
                        font-medium
                        "
                    >

                        {t('specialInstructions')}

                    </label>



                    <div
                        className="
                        relative
                        "
                    >


                        <MessageSquare

                            size={18}

                            className="
                            absolute
                            left-3
                            top-4
                            text-muted-foreground
                            "

                        />



                        <Textarea


                            placeholder={t('specInstructnPlaceholder')}


                            value={
                                customer.note ?? ""
                            }


                            onChange={(e) =>

                                updateCustomer(
                                    "note",
                                    e.target.value
                                )

                            }


                            className="
                            rounded-2xl
                            pl-10
                            min-h-28
                            "

                        />



                    </div>


                </div>



            </CardContent>


        </Card>


    );


}