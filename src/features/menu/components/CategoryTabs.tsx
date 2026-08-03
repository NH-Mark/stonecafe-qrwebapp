"use client";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="overflow-x-auto whitespace-nowrap px-2 py-2 hide-scrollbar">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`mr-3 px-5 py-2 rounded-full transition

          ${
            selected === category
              ? "bg-[#40332a] text-white text-xs"
              : "bg-white border border-[#e8dfd4] text-[#40332a] text-xs"
          }`}
        >
          {category}
        </button>

      ))}

    </div>
  );
}