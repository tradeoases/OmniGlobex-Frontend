import { PageHeader } from "@/components/PageHeader";
import { termsandConditionsData } from "@/data/privacy-data";

const TermsConditionsPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Terms and Condition" route="/ Terms and Condition" />
      <div className="my-10 w-10/12 xl:w-8/12 mx-auto">
        {termsandConditionsData.map((item, i) => (
          <div key={i} className="content-item w-full mb-10">
            <h2 className="text-[18px] font-medium text-qblack mb-5">
              {`${i + i}. ${item.title}`}
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

export default TermsConditionsPage;
