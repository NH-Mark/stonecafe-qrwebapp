"use client";

import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    useLocale,
} from "next-intl";

interface Props {
    title: string;
    backUrl?: string;
}

export default function CustomerHeader({
    title,
    backUrl = "/",
}: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const locale = useLocale();
    const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

    const params =
        new URLSearchParams(
            searchParams.toString()
        );

    const query =
        params.toString();

    const resolvedBackUrl =
        `/${locale}${backUrl}${
            query
                ? `?${query}`
                : ""
        }`;

    /*
    |--------------------------------------------------------------------------
    | Preserve table_id
    |--------------------------------------------------------------------------
    */

    const tableId =
        searchParams.get("table_id");

    /*
    |--------------------------------------------------------------------------
    | Build URL with current query parameters
    |--------------------------------------------------------------------------
    */

    function withQuery(
        url: string
    ) {

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

        return query
            ? `${url}?${query}`
            : url;
    }

    /*
    |--------------------------------------------------------------------------
    | Back
    |--------------------------------------------------------------------------
    */

    // const resolvedBackUrl =
    //     withQuery(
    //         backUrl.startsWith("/")
    //             ? `/${locale}${backUrl}`
    //             : backUrl
    //     );

    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    */

    function changeLanguage(
        lang: "en" | "ar"
    ) {

        const segments =
            pathname.split("/");

        /*
        | Replace current locale
        */

        segments[1] = lang;

        const newPath =
            segments.join("/");

        const params =
            new URLSearchParams(
                searchParams.toString()
            );

        const query =
            params.toString();

        router.push(
            `${newPath}${
                query
                    ? `?${query}`
                    : ""
            }`
        );
    }

    return (

        <header
            className="
                sticky
                top-0
                z-50
                bg-white/85
                backdrop-blur-xl
                border-b
                border-[#eee7df]
            "
        >

            <div
                className="
                    h-16
                    px-5
                    flex
                    items-center
                    justify-between
                    relative
                "
            >

                {/* LEFT */}

                <Link
                    href={resolvedBackUrl}
                    className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#f7f2ec]
                        flex
                        items-center
                        justify-center
                        active:scale-95
                        transition
                    "
                >
                    <BackArrow
                        size={19}
                        strokeWidth={2}
                        className="
                            text-[#40332a]
                        "
                    />
                </Link>

                {/* CENTER LOGO */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                    "
                >

                    <img
                        src="/images/stone-logo.png"
                        alt="Stone Cafe"
                        className="
                            w-11
                            h-11
                            object-contain
                        "
                    />

                </div>

                {/* RIGHT */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    {/* Language */}

                    <button
                        onClick={() =>
                            changeLanguage(
                                locale === "en"
                                    ? "ar"
                                    : "en"
                            )
                        }
                        className="
                            h-10
                            min-w-10
                            px-3
                            rounded-full
                            bg-[#f7f2ec]
                            flex
                            items-center
                            justify-center
                            active:scale-95
                            transition
                            text-sm
                            font-bold
                            text-[#40332a]
                        "
                    >
                        {locale === "en"
                            ? "عربي"
                            : "EN"}
                    </button>

                    {/* Title */}

                    <div
                        className="
                            min-w-[80px]
                            flex
                            justify-end
                        "
                    >

                        <h1
                            className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-wide
                                text-[#40332a]
                                truncate
                            "
                        >
                            {title}
                        </h1>

                    </div>

                </div>

            </div>

        </header>
    );
}