// services/payment.service.ts

import {apiClient} from "@/src/services/api";
import { PaymentMethod } from "@/src/types/payment-method";

export async function getPaymentMethods() {
    const response = await apiClient<{
        data: PaymentMethod[];
    }>("/payment-methods");

    return response.data;
}