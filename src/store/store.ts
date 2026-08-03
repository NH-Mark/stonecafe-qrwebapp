import { create } from "zustand";
import { persist } from "zustand/middleware";


type OrderType = "dine_in" | "takeaway";


interface OrderStore {

    type: OrderType | null;

    setType:(type:OrderType)=>void;

    clearType:()=>void;

}


export const useOrderStore = create<OrderStore>()(
    persist(
        (set)=>({

            type:null,

            setType:(type)=>
                set({
                    type
                }),

            clearType:()=>
                set({
                    type:null
                })

        }),
        {
            name:"stone-cafe-order"
        }
    )
);