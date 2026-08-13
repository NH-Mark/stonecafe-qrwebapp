"use client";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    useOrderStore,
} from "../../../store/store";

import {
    ArrowRight,
    ShoppingBag,
    UtensilsCrossed,
} from "lucide-react";

import {
    useLocale,
    useTranslations,
} from "next-intl";

export default function OrderTypeSelector() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setType = useOrderStore(
        state => state.setType
    );

    const t = useTranslations("orderType");

    const locale = useLocale();

    /*
    |--------------------------------------------------------------------------
    | Get table_id from URL
    |--------------------------------------------------------------------------
    */

    const tableId =
        searchParams.get("table_id");

    /*
    |--------------------------------------------------------------------------
    | Select order type
    |--------------------------------------------------------------------------
    */

    function select(
        type: "dine_in" | "takeaway"
    ) {

        setType(type);

        /*
        |----------------------------------------------------------------------
        | Preserve table_id
        |----------------------------------------------------------------------
        */

        const params =
            new URLSearchParams();

        if (tableId) {
            params.set(
                "table_id",
                tableId
            );
        }

        const query =
            params.toString();

        router.push(
            `/${locale}/menu${
                query
                    ? `?${query}`
                    : ""
            }`
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Change language
    |--------------------------------------------------------------------------
    */

    function changeLanguage(
        lang: "en" | "ar"
    ) {

        const segments =
            pathname.split("/");

        segments[1] = lang;

        /*
        | Keep table_id when changing language.
        */

        const params =
            new URLSearchParams(
                searchParams.toString()
            );

        const query =
            params.toString();

        router.push(
            `${segments.join("/")}${
                query
                    ? `?${query}`
                    : ""
            }`
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f3f3] flex justify-center">

            <div className="w-full max-w-md">

                {/* Hero */}

                <div className="relative h-64 flex items-center justify-center">

                    <img
                        src="/logo.png"
                        className="w-40"
                        alt="Logo"
                    />

                </div>

                {/* Language */}

                <div className="absolute top-5 right-5">

                    <button
                        onClick={() =>
                            changeLanguage(
                                locale === "en"
                                    ? "ar"
                                    : "en"
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            bg-white
                            shadow
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-[#40332a]
                        "
                    >
                        {locale === "en"
                            ? "العربية"
                            : "English"}
                    </button>

                </div>

                <div className="px-5 -mt-10">

                    <h3 className="
                        text-center
                        mt-8
                        mb-6
                        text-[#40332a]
                        text-lg
                        font-semibold
                    ">
                        {t("title")}
                    </h3>

                    {/* Cards */}

                    <div className="grid grid-cols-2 gap-5">

                        {/* DINE IN */}

                        <div
                            onClick={() =>
                                select("dine_in")
                            }
                            className="
                                cursor-pointer
                                bg-white
                                rounded-[30px]
                                shadow-lg
                                p-6
                                transition
                                hover:-translate-y-1
                                active:scale-95
                            "
                        >

                            <div className="
                                w-20
                                h-20
                                rounded-full
                                bg-[#efe5d9]
                                flex
                                items-center
                                justify-center
                                mx-auto
                            ">
                                <UtensilsCrossed
                                    size={38}
                                    color="#40332a"
                                />
                            </div>

                            <h2 className="
                                mt-6
                                text-xl
                                text-center
                                font-bold
                                text-[#40332a]
                            ">
                                {t("dineIn")}
                            </h2>

                            <p className="
                                mt-2
                                text-center
                                text-sm
                                text-gray-500
                            ">
                                {t("dineInDesc")}
                            </p>

                            <div className="
                                flex
                                justify-center
                                mt-7
                            ">
                                <div className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-[#40332a]
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <ArrowRight
                                        color="white"
                                        className="rtl:rotate-180"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* TAKE AWAY */}

                        <div
                            onClick={() =>
                                select("takeaway")
                            }
                            className="
                                cursor-pointer
                                bg-white
                                rounded-[30px]
                                shadow-lg
                                p-6
                                transition
                                hover:-translate-y-1
                                active:scale-95
                            "
                        >

                            <div className="
                                w-20
                                h-20
                                rounded-full
                                bg-[#eef3ea]
                                flex
                                items-center
                                justify-center
                                mx-auto
                            ">
                                <ShoppingBag
                                    size={38}
                                    color="#40332a"
                                />
                            </div>

                            <h2 className="
                                mt-6
                                text-xl
                                text-center
                                font-bold
                                text-[#40332a]
                            ">
                                {t("takeAway")}
                            </h2>

                            <p className="
                                mt-2
                                text-center
                                text-sm
                                text-gray-500
                            ">
                                {t("takeAwayDesc")}
                            </p>

                            <div className="
                                flex
                                justify-center
                                mt-7
                            ">
                                <div className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-[#40332a]
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <ArrowRight
                                        color="white"
                                        className="rtl:rotate-180"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}