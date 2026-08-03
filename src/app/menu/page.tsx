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
import { MenuItem } from "@/types/menu";
import { useRouter } from "next/navigation";


export default function MenuPage() {


    const [selectedCategory, setSelectedCategory] =
        useState("All");


    const [search, setSearch] =
        useState("");



    const {
        categories,
        menu,
        loading
    } = useMenu();




    const filteredMenu = useMemo(() => {


        return menu.filter(item => {


            const categoryMatch =
                selectedCategory === "All" ||
                item.category?.name === selectedCategory;



            const searchMatch =
                item.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            return categoryMatch && searchMatch;


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

    const addItem = useCartStore(state => state.addItem);
    const handleItemClick = (item: MenuItem) => {

        const hasModifiers =
            item.modifier_groups?.some(
                group => group.modifiers.length > 0
            );

        if (hasModifiers) {

            router.push(`/menu/${item.id}`);
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

                title="Menu"

                backUrl="/"

            />





            <div
                className="
px-5
"
            >


                {/* SEARCH */}


                <input


                    value={search}


                    onChange={
                        e => setSearch(e.target.value)
                    }


                    placeholder="Search food..."


                    className="
mt-5
w-full
rounded-2xl
bg-white
px-4
py-3
outline-none
shadow-sm
"

                />







                {/* CATEGORIES */}


                <div

                    className="
mt-6
flex
gap-4
overflow-x-auto
hide-scrollbar
"

                >


                    {

                        categories.map(cat => (


                            <div

                                key={cat.id}

                                onClick={() =>
                                    setSelectedCategory(cat.name)
                                }

                                className="
cursor-pointer
flex-shrink-0
"

                            >


                                <CategoryCard

                                    title={cat.name}

                                    image={cat.image}

                                    active={
                                        selectedCategory === cat.name
                                    }

                                />


                            </div>


                        ))

                    }


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

                        Popular Items

                    </h2>




                    <div

                        className="
space-y-4
"

                    >


                        {

                            filteredMenu.length === 0 &&

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

                        }





                        {

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

                <div

                    className="
            fixed
            bottom-5
            left-1/2
            -translate-x-1/2
            w-full
            px-5
            z-50

            sm:max-w-md
            md:max-w-xl
            lg:max-w-2xl

            "

                >

                    <FloatingCart

                        items={totalItems}

                        total={totalPrice}

                    />


                </div>

            }



        </div>


    );


}