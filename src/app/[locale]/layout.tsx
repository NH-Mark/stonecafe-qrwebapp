import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


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


export default async function RootLayout({

  children,
  params

}: {

  children: React.ReactNode;
  params: Promise<{locale:string}>

}) {

  const {locale} = await params;
  const messages = await getMessages();
  return (

    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="h-full"
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

          <NextIntlClientProvider messages={messages}>

            {children}

          </NextIntlClientProvider>


          <Toaster
            position="top-center"
          />

        </div>

      </body>

    </html>

  );
}