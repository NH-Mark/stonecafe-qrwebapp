"use client";

import Link from "next/link";
import {
    ShoppingCart,
    ArrowRight
} from "lucide-react";

import { motion } from "framer-motion";


interface Props {

    items: number;

    total: number;

}



export default function FloatingCart({

    items,

    total

}: Props) {



    return (

        <Link

            href="/checkout"

            className="
block
w-full
"

        >


            <motion.div

                initial={{
                    y: 30,
                    opacity: 0
                }}

                animate={{
                    y: 0,
                    opacity: 1
                }}

                whileTap={{
                    scale: 0.96
                }}


                className="
w-full
cursor-pointer

bg-[#40332a]/95

backdrop-blur-xl

text-white

rounded-3xl

px-5
py-4

shadow-2xl

flex
items-center
justify-between

"

            >


                {/* LEFT */}

                <div

                    className="
flex
items-center
gap-4
min-w-0
"

                >


                    <div

                        className="
w-11
h-11
shrink-0
rounded-2xl
bg-white/10
flex
items-center
justify-center
"

                    >

                        <ShoppingCart size={20} />

                    </div>





                    <div
                        className="
min-w-0
"
                    >


                        <p

                            className="
font-bold
text-sm
truncate
"

                        >

                            {items} {items === 1 ? "Item" : "Items"}

                        </p>




                        <p

                            className="
text-sm
text-white/70
mt-0.5
"

                        >

                            Checkout

                        </p>



                    </div>


                </div>







                {/* RIGHT */}


                <div

                    className="
flex
items-center
gap-3
shrink-0
"

                >


                    <span

                        className="
font-black
text-base
"

                    >

                        {total.toFixed(2)} QAR

                    </span>




                    <div

                        className="
w-9
h-9
rounded-xl
bg-white/10
flex
items-center
justify-center
"

                    >


                        <ArrowRight size={18} />


                    </div>



                </div>



            </motion.div>


        </Link>


    );


}