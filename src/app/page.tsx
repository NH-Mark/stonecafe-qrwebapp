import Image from "next/image";
import OrderTypeSelector from "../features/order-type/components/OrderTypeSelector";

export default function Home() {
  return (
    <main>
      <OrderTypeSelector />
    </main>
  );
}
