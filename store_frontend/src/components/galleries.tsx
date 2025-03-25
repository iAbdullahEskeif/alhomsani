import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GalleryItem {
  name: string;
  path: string;
}

interface Gallery {
  title: string;
  items: GalleryItem[];
}

const Galleries = () => {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const galleries: Gallery[] = [
    {
      title: "Available Products",
      items: [
        { name: "Classic Cars", path: "/cars/classiccars" },
        { name: "Luxury Cars", path: "/cars/luxurycars" },
        { name: "Electrical Cars", path: "/cars/electricalcars" },
      ],
    },
    {
      title: "Upcoming Models",
      items: [
        { name: "2025 Concept Cars", path: "/conceptcars" },
        { name: "Future Classics", path: "/futureclassics" },
      ],
    },
  ];

  return (
    <>
      <div className="max-w-md mx-auto mt-10 px-4 pb-16">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2 className="text-2xl font-bold text-white">Vehicle Categories</h2>
        </div>

        {galleries.map((gallery: Gallery, index: number) => (
          <div
            key={index}
            className="mb-4 border border-zinc-800 rounded-lg bg-zinc-900"
          >
            <div
              className="flex justify-between items-center p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white cursor-pointer rounded-t-lg border-b border-zinc-800"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium">{gallery.title}</span>
              <span className="text-rose-500">
                {openIndexes[index] ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </div>
            {openIndexes[index] && (
              <div className="p-4 bg-zinc-900">
                {gallery.items.map((item: GalleryItem, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className="mb-2 border-b border-zinc-800 pb-2 last:border-0 last:pb-0"
                  >
                    <Link
                      to={item.path}
                      className="text-zinc-300 hover:text-rose-500 transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Galleries;

