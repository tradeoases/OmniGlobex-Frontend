import { PageHeader } from "@/components/PageHeader";
import CookiePolicy from "./componets/cookies-policy-info";

export const CookiesPolicyPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Cookie Policy" route="/ cookie-policy" />
      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <CookiePolicy />
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto my-14"></div>
    </div>
  );
};
