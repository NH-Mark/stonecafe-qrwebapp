import { apiClient } from "@/src/services/api";
import { CustomerLookup } from "@/types/customer";


export async function findCustomerByPhone(
    phone: string
): Promise<CustomerLookup | null> {


    const response =
        await apiClient<{
            success: boolean;
            exists: boolean;
            data: CustomerLookup | null;
        }>(
            `/lookup/${phone}`
        );


    if (!response.exists) {

        return null;

    }


    return response.data;


}
export interface CustomerOrder {

    id: number;

    order_no: string;

    payment_status: string;

    total_amount: number;

}


export interface CustomerOrderResponse {

    success: boolean;

    message: string;

    data: CustomerOrder;

}



export async function createCustomerOrder(
    order:any
): Promise<CustomerOrderResponse>
{

    return apiClient<CustomerOrderResponse>(
        "/orders",
        {
            method:"POST",
            body:JSON.stringify(order)
        }
    );

}