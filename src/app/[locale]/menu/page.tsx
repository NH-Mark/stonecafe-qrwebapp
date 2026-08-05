"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useCartStore } from "@/src/store/useCartStore";

import CategoryCard from "@/src/features/menu/components/CategoryCard";
import { useMenu } from "@/src/features/menu/hooks/useMenu";
import MenuItemPage from "@/src/features/menu/components/MenuItem";
import CustomerHeader from "@/src/components/CustomerHeader";
import PageLoader from "@/src/components/common/PageLoader";
import FloatingCart from "@/src/features/cart/components/FloatingCart";
import { toast } from "sonner";
import { MenuItem } from "@/src/types/menu";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";


export default function MenuPage() {


    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


    const [search, setSearch] =
        useState("");

    const t = useTranslations("menu");

    const {
        categories,
        menu,
        loading
    } = useMenu();




    const filteredMenu = useMemo(() => {

        return menu.filter(item => {

            const searchMatch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());

            // Search always works globally
            if (search.trim()) {
                return searchMatch;
            }

            // Category filter
            return (
                selectedCategory === null ||
                item.category?.id === selectedCategory
            );

        });

    }, [
        menu,
        selectedCategory,
        search
    ]);

    const totalItems = useCartStore(
        state => state.totalItems()
    );


    const totalPrice = useCartStore(
        state => state.totalPrice()
    );

    const router = useRouter();
    const locale = useLocale();
    const [categoryLoading, setCategoryLoading] = useState(false);


    const Arrow = locale === "ar"
        ? ChevronLeft
        : ChevronRight;

    const addItem = useCartStore(state => state.addItem);
    const handleItemClick = (item: MenuItem) => {

        const hasModifiers =
            item.modifier_groups?.some(
                group => group.modifiers.length > 0
            );

        if (hasModifiers) {

            router.push(`/${locale}/menu/${item.id}`);
            return;
        }

        addItem({
            id: crypto.randomUUID(),
            product_id: item.id,

            name: item.name,

            qty: 1,

            price: Number(item.price),

            image: item.image ?? undefined,

            modifiers: [],


        });

        toast.success(`${item.name} added to cart`);

    };

    function handleCategoryChange(categoryId: number) {

        setCategoryLoading(true);

        setSelectedCategory(categoryId);

        setTimeout(() => {
            setCategoryLoading(false);
        }, 500);

    };







    if (loading) {

        return <PageLoader />

    }





    return (


        <div

            className="
relative
min-h-screen
bg-gradient-to-b
from-[#f7f4ef]
via-[#f5f3ef]
to-[#f1ece6]
pb-32
"

        >


            {/* HEADER */}

            <CustomerHeader

                title={t("title")}

                backUrl="/"

            />





            <div
                className="
px-5
"
            >


                {/* SEARCH */}


                <div className="relative mt-5">
                <Search
                    className={`
                        absolute
                        top-1/2
                        -translate-y-1/2
                        ${locale === "ar" ? "right-4" : "left-4"}
                        w-5
                        h-5
                        text-gray-400
                    `}
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("searchPlaceholder")}
                    className={`
                        w-full
                        rounded-2xl
                        bg-white
                        py-3
                        shadow-sm
                        outline-none
                        ${locale === "ar" ? "pr-12 pl-4" : "pl-12 pr-4"}
                    `}
                />
            </div>







                {/* CATEGORIES */}


                <div className="relative">

    {/* Categories */}
    <div
        className="
            flex
            gap-4
            overflow-x-auto
            scrollbar-hide
            px-1
            pr-10
            pt-5
        "
    >
        {categories.map((cat) => {

            const title =
                locale === "ar"
                    ? (cat.name_ar?.trim() || cat.name)
                    : cat.name;

            return (
                <div
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className="cursor-pointer flex-shrink-0"
                >
                    <CategoryCard
                        title={title}
                        image={cat.image}
                        active={selectedCategory === cat.id}
                    />
                </div>
            );
        })}
    </div>

    {/* Scroll Hint */}
    <div
        className="
            pointer-events-none
            absolute
            top-0
            bottom-0
            right-0
            w-16
            flex
            items-center
            justify-end
            bg-gradient-to-l
            from-[#faf7f2]
            to-transparent
        "
    >
        <Arrow
            className="
                h-6
                w-6
                text-[#8b7355]
                animate-pulse
            "
        />
    </div>

</div>







                {/* MENU ITEMS */}


                <div className="mt-8">


                    <h2

                        className="
font-bold
text-lg
text-[#40332a]
mb-4
"

                    >

                        {t("popularItems")}

                    </h2>




                    <div className="space-y-4">

                        {
                            categoryLoading ?

                                <div
                                    className="
                                    bg-white
                                    rounded-2xl
                                    py-10
                                    flex
                                    items-center
                                    justify-center
                                    shadow-sm
                                    "
                                >
                                    <div
                                        className="
                                        w-6
                                        h-6
                                        border-2
                                        border-gray-200
                                        border-t-[#40332a]
                                        rounded-full
                                        animate-spin
                                        "
                                    />
                                </div>

                                :

                                filteredMenu.length === 0 ?

                                    <div
                                        className="
            bg-white
            rounded-2xl
            p-6
            text-center
            text-gray-500
            "
                                    >
                                        No items found
                                    </div>

                                    :

                                    filteredMenu.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleItemClick(item)}
                                            className="cursor-pointer"
                                        >
                                            <MenuItemPage item={item} />
                                        </div>
                                    ))
                        }

                    </div>


                </div>



            </div>






            {/* FLOATING CART */}


            {
                totalItems > 0 &&

               

                    <FloatingCart

                        items={totalItems}

                        total={totalPrice}

                    />

            }



        </div>


    );


}