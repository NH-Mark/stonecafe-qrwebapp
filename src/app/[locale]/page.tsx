import OrderTypeSelector from "@/src/features/order-type/components/OrderTypeSelector";

function isOrderingClosed() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Qatar",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);

  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  const minute = Number(parts.find((p) => p.type === "minute")?.value);

  const currentMinutes = hour * 60 + minute;

  const openingTime = 5 * 60; // 08:00
  const closingTime = 22 * 60 + 30; // 22:30

  return currentMinutes >= closingTime || currentMinutes < openingTime;
}

export default function Home() {
  const orderingClosed = isOrderingClosed();

  if (orderingClosed) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold">
            Ordering is currently unavailable
          </h1>

          <p className="mb-4 text-gray-600">
            Our ordering service is closed at the moment.
          </p>

          <p className="text-gray-600">
            Ordering is available from <strong>5:00 AM</strong> until{" "}
            <strong>10:30 PM</strong>.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            If you need assistance, please contact our staff.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <OrderTypeSelector />
    </main>
  );
}