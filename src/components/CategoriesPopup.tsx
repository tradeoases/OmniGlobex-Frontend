/* eslint-disable react-hooks/exhaustive-deps */
// import { ICategory } from "./Sidemenu";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode } from "axios";
import {
  getAllProductCategories,
  IProductCategory,
} from "@/service/apis/product-services";
import { LuChevronRight } from "react-icons/lu";
import { NavLink, useSearchParams } from "react-router-dom";

interface IAllCategory {
  onToggle: () => void;
  isOpen: boolean;
}
export const CategoriesPopup: React.FC<IAllCategory> = ({
  onToggle,
  isOpen,
}) => {
  const catRef = useRef<HTMLDivElement | null>(null);

  const onClose = (event: MouseEvent) => {
    if (catRef.current && !catRef.current.contains(event.target as Node)) {
      onToggle();
    }
  };

  const { data: categories, isSuccess: categoriesSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as IProductCategory[];
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", onClose);
    } else {
      document.removeEventListener("mousedown", onClose);
    }

    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      catRef.current?.classList.add("closed");
    } else {
      catRef.current?.classList.remove("closed");
    }
  }, [isOpen]);
  return (
    <div
      ref={catRef}
      className={`absolute overflow-hidden top-12 left-0 transition-transform duration-300 ${
        !isOpen ? "max-h-full scale-y-100" : "max-h-0 scale-y-0"
      }`}
      style={{
        transformOrigin: "top",
        transform: isOpen ? "scaleY(1)" : "scaleY(0)",
        maxHeight: isOpen ? "1000px" : "0",
      }}
    >
      {categoriesSuccess &&
        categories?.map((cat) => (
          <CategoryItem key={cat.category_id} {...cat} />
        ))}
    </div>
  );
};

const CategoryItem = ({
  name,
  category_id,
}: {
  category_id: string;
  name: string;
}) => {
  const [searchParams] = useSearchParams();

  const updatedSearchParams = new URLSearchParams(searchParams.toString());
  updatedSearchParams.set("category", category_id);

  return (
    <NavLink
      to={`/products?${updatedSearchParams.toString()}`}
      className="flex items-center justify-between px-6 py-3 border-t border-light bg-white hover:bg-main"
    >
      <div className="flex items-center gap-x-4">
        <span className="line-clamp-1 font-thin">{name}</span>
      </div>
      <LuChevronRight className="text-base" />
    </NavLink>
  );
};
