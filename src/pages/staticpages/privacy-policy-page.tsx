import { PageHeader } from "@/components/PageHeader";
import { privacies } from "@/data/privacy-data";

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Privacy Policy" route="/ Privacy Policy" />
      <div className="my-10 w-10/12 xl:w-8/12 mx-auto">
        {privacies.map((item, i) => (
          <div key={i} className="content-item w-full mb-10">
            <h2 className="text-[18px] font-medium text-qblack mb-5">
              {`${i + 1}. ${item.title}`}
            </h2>
            <p className="text-[15px] text-gray-500 leading-7">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
