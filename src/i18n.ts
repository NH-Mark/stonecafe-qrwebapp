// src/i18n.ts

import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({requestLocale}) => {

  const locale = await requestLocale;

  const currentLocale =
    locale === "ar" ? "ar" : "en";


  return {
    locale: currentLocale,

    messages: (
      await import(`./messages/${currentLocale}.json`)
    ).default
  };

});