import { AxiosResponse, HttpStatusCode } from "axios";
import request from "../base.service";

const PATH = "/image/";

export interface IUPloadFile {
  images: string[];
  folder?: string;
}

export interface IUploadedFile {
  file_url: string;
  file_id: string;
}

export const uploadFile = async (data: IUPloadFile) =>
  await request.post(`${PATH}upload`, data);

export const uploadImageFileToImageKit = async (fileBase64: string) => {
  try {
    const data: IUPloadFile = {
      images: [fileBase64],
      folder: "omniglobex",
    };

    const response: AxiosResponse = await uploadFile(data);

    if (response.status === HttpStatusCode.Ok) {
      const imageData: IUploadedFile = response.data.data.data[0];
      return imageData;
    }
  } catch (error) {
    return null;
  }
};
