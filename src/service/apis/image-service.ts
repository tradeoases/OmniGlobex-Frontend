// import request from "../base.service";

import request from "../base.service";

// const PATH = "image/";

export const PRODUCT_FOLDER = "/product";
export const PROFILE_FOLDER = "/profile";

export interface ICreateImage {
  images: string[];
}

export const uploadImages = async (data: ICreateImage) =>
  await request.post(`/image/upload`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
