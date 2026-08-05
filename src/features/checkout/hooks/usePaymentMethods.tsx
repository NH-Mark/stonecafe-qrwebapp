// src/features/checkout/hooks/usePaymentMethods.ts

"use client";

import { useEffect, useState } from "react";
import { PaymentMethod } from "@/src/types/payment-method";
import { getPaymentMethods } from "@/src/services/payment.service";

export function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPaymentMethods();
        setMethods(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    methods,
    loading,
  };
}