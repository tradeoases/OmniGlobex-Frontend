import { PageHeader } from "@/components/PageHeader";
import TermsAndConditions from "./componets/terms-info";

export const TermsPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Terms and Conditions" route="/ terms-condition" />
      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <TermsAndConditions />
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto my-14"></div>
    </div>
  );
};
