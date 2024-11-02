export interface ICreateProduct {
  name: string;
  description: string;
  categoryId: string;
  productPrice: string;
  priceCurrency: string;
  showRooms?: string[];
  brandId?: string;
  productImages?: string[];
  coverImage?: string;
  units?: string;
}

export const productDetailNavs = [`Delivery Terms`, `Reviews`, `Seller Info`];

export const productDetailReviewNavs = [`Analytics`, `Reviews`, `Sells and Information`];
