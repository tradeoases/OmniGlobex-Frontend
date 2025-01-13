import { PageHeader } from "@/components/PageHeader";
import InformationSection from "./componets/information";

export const PrivacyPolicyPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Privacy Policy" route="/ privacy-policy" />
      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <InformationSection />
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto my-14"></div>
    </div>
  );
};
