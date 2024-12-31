import { RecoilState, atom } from "recoil";
import { IProduct, IProductCategory } from "@/service/apis/product-services";

export const ProductStore: RecoilState<IProduct[] | null> = atom<
  IProduct[] | null
>({
  key: "product-store",
  default: null,
});

export const ProductByUserStore: RecoilState<IProduct[] | null> = atom<
  IProduct[] | null
>({
  key: "product-by-user-store",
  default: null,
});

export const SingleProductStore: RecoilState<IProduct | null> =
  atom<IProduct | null>({
    key: "single-product-store",
    default: null,
  });

export const CategoryStore: RecoilState<IProductCategory[] | null> = atom<
  IProductCategory[] | null
>({
  key: "product-category-store",
  default: null,
});
