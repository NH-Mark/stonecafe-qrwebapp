import { imageUrl } from "@/src/utils/image";
import { ChevronRight } from "lucide-react";

interface Props {
  item: any;
}

export default function MenuItemPage({ item }: Props) {
  
  return (
    <div
      className="bg-white rounded-2xl p-3 shadow-sm cursor-pointer active:scale-[0.98] transition"
    >
      <div className="flex gap-3 items-center">
        <img
          src={imageUrl(item.image)}
          className="w-20 h-20 rounded-xl object-cover"
          alt={item.name}
        />
        <div className="flex-1">
          <h2 className="font-semibold text-[#40332a]">
            {item.name}
          </h2>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>

          <div className="mt-3 flex justify-between items-center">

            <span className="font-bold text-[#a57653]">
              QAR {item.price}
            </span>

            <div className="w-10 h-10 rounded-full bg-[#40332a] text-white flex items-center justify-center">
              <ChevronRight size={18} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}