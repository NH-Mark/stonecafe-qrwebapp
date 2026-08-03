import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {

  title: "Stone Cafe",

  description: "Scan QR and order",

};



export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {


  return (

    <html
      lang="en"
      className="
h-full
"
    >


      <body

        className="
min-h-screen
bg-[#eee8df]
flex
justify-center
"

      >


        <div

          className="
relative
w-full
min-h-screen

bg-[#faf7f2]

shadow-xl

sm:max-w-md

md:max-w-xl

lg:max-w-2xl

"

        >


          {children}


          <Toaster
            position="top-center"
          />


        </div>


      </body>


    </html>

  );

}