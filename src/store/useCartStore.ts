import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartModifier {

    id: number;

    groupId: number;

    groupName: string;

    name: string;

    price: number;

}

export interface CartItem {

    id: string;

    product_id: number;

    name: string;

    price: number;

    image?: string;

    qty: number;

    modifiers: CartModifier[];


}



interface CartStore {

    items: CartItem[];

    addItem: (item: CartItem) => void;

    removeItem: (id: string) => void;

    updateQty: (id: string, qty: number) => void;

    clearCart: () => void;

    totalItems: () => number;

    totalPrice: () => number;

}



export const useCartStore = create<CartStore>()(

    persist(

        (set, get) => ({

            items: [],


            addItem: (item) => {

                const current = get().items;

                const existing = current.find(cartItem =>

                    cartItem.product_id === item.product_id &&

                    isSameModifiers(
                        cartItem.modifiers,
                        item.modifiers
                    )

                );

                if (existing) {

                    set({

                        items: current.map(cartItem =>

                            cartItem.id === existing.id

                                ? {
                                    ...cartItem,
                                    qty: cartItem.qty + item.qty
                                }

                                : cartItem

                        )

                    });

                } else {

                    set({

                        items: [
                            ...current,
                            item
                        ]

                    });

                }

            },



            removeItem: (id) => {

                set({

                    items: get().items.filter(
                        item => item.id !== id
                    )

                });

            },



            updateQty: (id, qty) => {

                if (qty <= 0) {

                    get().removeItem(id);

                    return;

                }

                set({

                    items: get().items.map(item =>

                        item.id === id

                            ? {
                                ...item,
                                qty
                            }

                            : item

                    )

                });

            },



            clearCart: () => {


                set({

                    items: []

                });


            },



            totalItems: () => {


                return get()
                    .items
                    .reduce(
                        (sum, item) =>
                            sum + item.qty,
                        0
                    );


            },



            totalPrice: () => {


                return get()
                    .items
                    .reduce(

                        (sum, item) =>
                            sum + (item.price * item.qty),

                        0

                    );


            }



        }),

        {
            name: "stone-cafe-cart"
        }


    )

);

function isSameModifiers(
    a: CartModifier[] = [],
    b: CartModifier[] = []
) {
    if (a.length !== b.length) {
        return false;
    }
    const normalize = (items: CartModifier[]) =>
        [...items]
            .sort((x, y) => x.id - y.id)
            .map(item => ({
                id: item.id,
                groupId: item.groupId,
            }));

    return JSON.stringify(normalize(a))
        ===
        JSON.stringify(normalize(b));

}