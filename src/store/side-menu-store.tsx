import { TActiveMenu } from "@/data/data";
import { atom, RecoilState } from "recoil";

export const SidemenuStore: RecoilState<boolean> = atom<boolean>({
  key: "side-menu-store",
  default: false,
});

export const DashboardSideMenuStore: RecoilState<boolean> = atom<boolean>({
  key: "dashboard-side-menu-store",
  default: false,
});

export const DashboardMenuStore: RecoilState<TActiveMenu> = atom<TActiveMenu>({
  key: "dashboard-menu-store",
  default: "Dashboard",
});
