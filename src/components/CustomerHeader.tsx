"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";


interface Props {

    title: string;

    backUrl?: string;

}



export default function CustomerHeader({

    title,

    backUrl = "/",

}: Props) {


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

                    href={backUrl}

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

                    <ArrowLeft

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








                {/* RIGHT TITLE */}


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



        </header>



    );


}