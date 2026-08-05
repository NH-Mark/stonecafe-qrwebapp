"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { imageUrl } from "@/src/utils/image";
import { MenuItem } from "@/src/types/menu";
import AddToCartButton from "./AddToCartButton";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";


interface Props {
    product: MenuItem;
}


export default function ProductDetails({
    product
}: Props) {


    const [quantity, setQuantity] =
        useState(1);


    const [selectedModifiers, setSelectedModifiers]
        =
        useState<Record<number, number[]>>({});

    const locale = useLocale();
    const t = useTranslations("product");
    const common = useTranslations('common');
    const name =
        locale === "ar"
        ? product.name_ar?.trim() || product.name
        : product.name;

    const description =
        locale === "ar"
        ? product.description_ar?.trim() || product.description
        : product.description;

    function toggleModifier(
        group: any,
        modifierId: number
    ) {


        const type =
            group.pivot?.selection_type ??
            group.selection_type;



        setSelectedModifiers(prev => {


            const current =
                prev[group.id] ?? [];



            if (type === "single") {

                return {

                    ...prev,

                    [group.id]: [
                        modifierId
                    ]

                };

            }



            return {

                ...prev,

                [group.id]:

                    current.includes(modifierId)

                        ?

                        current.filter(
                            id => id !== modifierId
                        )

                        :

                        [
                            ...current,
                            modifierId
                        ]

            };


        });


    }




    const selectedModifierObjects =
        product.modifier_groups?.flatMap(group =>

            group.modifiers
                .filter(modifier =>
                    (selectedModifiers[group.id] ?? []).includes(modifier.id)
                )
                .map(modifier => ({
                    id: modifier.id,
                    groupId: group.id,
                    groupName: group.name,
                    groupName_ar: group.name_ar,
                    name: modifier.name,
                    name_ar: modifier.name_ar,
                    price: Number(modifier.price)
                }))

        ) ?? [];





    const modifierTotal =
    selectedModifierObjects.reduce(
        (sum, modifier) => sum + modifier.price,
        0
    );



    const unitPrice =
        Number(product.price)
        +
        modifierTotal;



    const totalPrice =
        unitPrice * quantity;




    const isRequiredCompleted =

        product.modifier_groups?.every(group => {


            const required =
                group.pivot?.required ??
                group.required;



            if (!required)
                return true;



            const minimum =
                group.pivot?.min_selection ??
                1;



            const selected =
                selectedModifiers[group.id]?.length
                ??
                0;



            return selected >= minimum;



        })

        ??
        true;







    return (

        <div
            className="
px-4
pb-32
"
        >



            {/* IMAGE */}

            <div
                className="
mt-4
rounded-3xl
overflow-hidden
shadow-sm
"
            >

                <img

                    src={imageUrl(product.image ?? "")}

                    alt={product.name}

                    className="
w-full
h-60
object-cover
"

                />

            </div>







            {/* PRODUCT INFO */}


            <div
                className="
mt-5
"
            >


                <div
                    className="
flex
justify-between
items-start
gap-3
"
                >


                    <h1
                        className="
text-xl
font-bold
text-[#40332a]
"
                    >

                        {name}

                    </h1>



                    <div
                        className="
bg-[#40332a]
text-white
rounded-full
px-4
py-1.5
text-sm
font-bold
"
                    >

                        {unitPrice.toFixed(2)} {common('qar')}

                    </div>



                </div>





                {
                    description &&

                    <p
                        className="
mt-2
text-sm
text-gray-500
"
                    >

                        {description}

                    </p>

                }

            </div>








            {/* MODIFIERS */}


            <div
                className="
mt-6
"
            >


                {
                    product.modifier_groups?.map(group => {


                        const type =
                            group.pivot?.selection_type ??
                            group.selection_type;


                        const required =
                            group.pivot?.required ??
                            group.required;



                        const selectedCount =
                            selectedModifiers[group.id]?.length ?? 0;

                          const group_name =
                            locale === "ar"
                            ? group.name_ar?.trim() || group.name
                            : group.name;

  



                        return (

                            <div
                                key={group.id}
                                className="
mb-6
"
                            >


                                {/* HEADER */}

                                <div
                                    className="
flex
justify-between
items-center
mb-3
"
                                >


                                    <div
                                        className="
flex
items-center
gap-2
"
                                    >


                                        <h3
                                            className="
font-bold
text-[#40332a]
"
                                        >

                                            {group_name}

                                        </h3>


                                        {
                                            required &&

                                            <span
                                                className="
text-[10px]
font-bold
uppercase
bg-red-50
text-red-600
px-2
py-1
rounded-full
"
                                            >

                                                {t('required')}

                                            </span>

                                        }


                                    </div>





                                    <span
                                        className="
text-xs
bg-[#efe5d9]
px-3
py-1
rounded-full
"
                                    >

                                        {
                                            type === "single"
                                                ?
                                                t('chooseOne')
                                                :
                                                t('chooseMultiple')
                                        }

                                    </span>



                                </div>






                                <div
                                    className="
space-y-2
"
                                >


                                    {
                                        group.modifiers.map(modifier => {

                                              const modifier_name =
                                                locale === "ar"
                                                ? modifier.name_ar?.trim() || modifier.name
                                                : modifier.name;

                                            const selected =

                                                selectedModifiers[group.id]
                                                    ?.includes(
                                                        modifier.id
                                                    )
                                                ??
                                                false;



                                            return (

                                                <button

                                                    key={modifier.id}

                                                    onClick={() =>
                                                        toggleModifier(
                                                            group,
                                                            modifier.id
                                                        )
                                                    }


                                                    className={`
w-full
flex
justify-between
items-center
p-3
rounded-2xl
border
transition

${selected

                                                            ?

                                                            "bg-[#f5eee7] border-[#40332a]"

                                                            :

                                                            "bg-white border-gray-200"

                                                        }

`}

                                                >


                                                    <div
                                                        className="
flex
items-center
gap-3
"
                                                    >


                                                        <div

                                                            className={`
w-6
h-6
rounded-full
border
flex
items-center
justify-center

${selected
                                                                    ?
                                                                    "bg-[#40332a] border-[#40332a]"
                                                                    :
                                                                    "bg-white"
                                                                }

`}

                                                        >

                                                            {
                                                                selected &&

                                                                <Check
                                                                    size={14}
                                                                    color="white"
                                                                />

                                                            }

                                                        </div>



                                                        <span
                                                            className="
text-sm
font-medium
text-[#40332a]
"
                                                        >

                                                            {modifier_name}

                                                        </span>


                                                    </div>




                                                  <span
                                                        className="
                                                            text-sm
                                                            text-gray-500
                                                        "
                                                    >
                                                        + {Number(modifier.price).toFixed(2)} {common('qar')}
                                                    </span>



                                                </button>


                                            )


                                        })

                                    }


                                </div>



                            </div>


                        )


                    })

                }


            </div>







            <AddToCartButton
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                selectedModifiers={selectedModifierObjects}
                unitPrice={unitPrice}
                totalPrice={totalPrice}
                disabled={!isRequiredCompleted}
            />


        </div>

    );


}