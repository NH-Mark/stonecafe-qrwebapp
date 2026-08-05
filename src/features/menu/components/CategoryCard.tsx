import { imageUrl } from "@/src/utils/image";

interface Props {
  image: string;
  title: string;
  subtitle?: string;
  active?: boolean;
}

export default function CategoryCard({
  image,
  title,
  subtitle = "Explore menu",
  active = false,
}: Props) {
  
  return (
    <div
      className={`relative w-40 h-40 shrink-0 rounded-3xl overflow-hidden transition-all duration-300 ease-out
      ${
        active
          ? "scale-[1.05] shadow-xl"
          : "scale-100 shadow-md hover:shadow-lg hover:-translate-y-1"
      }
      bg-white`}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3f3f3] via-[#ddcfbe] to-[#c3b6a4]" />

      <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#a57653]/20 rounded-full blur-3xl" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#40332a]/10 via-transparent to-transparent" />

      {/* GLOW */}
      <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#40332a]/10 rounded-full blur-2xl" />

      {/* CONTENT */}
      <div className="relative h-full flex flex-col items-center justify-center px-3 gap-2">

        {/* IMAGE */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src={imageUrl(image)}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* TITLE */}
        <h2 className="text-sm font-semibold text-[#2f261f] text-center leading-tight">
          {title}
        </h2>

        {/* SUBTITLE (optional lighter weight) */}
        {/* <p className="text-[10px] text-[#7a6d63] text-center leading-tight -mt-1">
          {subtitle}
        </p> */}

        {/* INDICATOR */}
        <div
          className={`h-[3px] rounded-full transition-all duration-300 mt-1
          ${active ? "bg-[#40332a] w-10" : "bg-[#40332a]/30 w-8"}`}
        />
      </div>
    </div>
  );
}