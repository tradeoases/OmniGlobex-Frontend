/* eslint-disable react-refresh/only-export-components */
import { RecoilState, atom } from "recoil";

export interface IRole {
  role_id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  business_id: string;
  business_name: string;
  email: string;
  active: number;
  status: number;
  is_email_verified: number;
  roles: IUserRole[];
  profile: {
    address: string;
    business_verified: boolean;
    city: string;
    slogan: string;
    phonenumber: string;
    country_id: string;

    business_type: string;
    number_of_employees: string;
    year_started: string;
    certificate_id: string;
  };
  preferances: {
    currency: string;
    language: string;
  };
  profileImages: {
    image_for: "LOGO" | "PROFILE" | "COVER";
    image_url: string;
    thumbnail_url: string;
  }[];
  profile_links: {
    contact_type:
      | "INSTAGRAM"
      | "FACEBOOK"
      | "TWITTER"
      | "YOUTUBE"
      | "SNAPCHAT"
      | "TIKTOK"
      | "PINTEREST"
      | "LINKEDIN"
      | "TUMBLR"
      | "TELEGRAM";
    link: string;
  }[];
  subscription?: {
    plan: "Basic" | "Standard" | "Premium";
  };
}

export interface IUpdateProfileData {
  business_name?: string;
  profile?: {
    phonenumber?: string;
    address?: string;
    city?: string;
    country_id?: string;
    slogan?: string;
    business_type?: string;
    number_of_employees?: string;
    year_started?: string;
  };
  social_media?: {
    link_id?: string;
    link_for:
      | 'INSTAGRAM'
      | 'FACEBOOK'
      | 'TWITTER'
      | 'YOUTUBE'
      | 'SNAPCHAT'
      | 'TIKTOK'
      | 'PINTEREST'
      | 'LINKEDIN'
      | 'TUMBLR'
      | 'TELEGRAM';
    link: string;
  }[];
  cover_id?: string;
  profile_id?: string;
  logo_id?: string;
}

export type IUserRole =
  | "Buyer"
  | "Admin"
  | "Supplier"
  | "LocalMarketing"
  | "LocalLogistic"
  | "InternationalSupplier";

export const RoleStore: RecoilState<IRole[] | null> = atom<IRole[] | null>({
  key: "role-store",
  default: null,
});

export const userStore: RecoilState<IUser | null> = atom<IUser | null>({
  key: "user-store",
  default: null,
});

export const EmailStore: RecoilState<{
  email: string | null;
  id: string | null;
}> = atom<{ email: string | null; id: string | null }>({
  key: "email-store",
  default: { email: null, id: null },
});
