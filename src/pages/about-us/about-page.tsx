import { PageHeader } from "@/components/PageHeader";
// import CustomerFeedback from "@/components/customer-feedback";
import AboutUsSection from "@/pages/about-us/components/about-us-section";
import CustomerFeedback from "@/components/customer-feedback";
import OurVisionSection from "./components/our-vision";
import OfferComponent, { OfferType } from "./components/OfferComponent";

const offers: OfferType[] = [
  {
    title: "Global Reach, Local Impact",
    body: "With our unique Country-Specific Showrooms, businesses can showcase their products and services to targeted markets, allowing buyers to find the right solutions tailored to their needs. Each showroom is carefully curated and localized to reflect the market’s preferences and demands, creating a more personal and relevant experience for users.",
  },
  {
    title: "Consortium Partnerships",
    body: "OmniGlobex introduces the Consortium feature, a collaborative space for intermediary service providers in the global supply chain. Through Consortiums, companies can pool resources and offer end-to-end solutions for international trade, from legal support to logistics, ensuring that transactions are smooth, compliant, and efficient.",
  },
  {
    title: "Data-Driven Insights",
    body: "Our platform leverages advanced analytics and AI-driven insights to help users make informed decisions, track market trends, and discover new opportunities. We provide real-time performance data for users, allowing them to optimize their strategies and operations based on detailed market analysis.",
  },
  {
    title: "Security and Transparency",
    body: "We prioritize the security of our users’ data and financial transactions. Our secure payment gateway, combined with a review-based invoice approval system, ensures that every transaction is handled with transparency, protecting both parties involved.",
  },
  {
    title: "Support and Local Partnerships",
    body: "OmniGlobex operates with the support of strategic local partners in key international hubs. These partners help us localize content, manage customer success, and grow the user base by leveraging their expertise and networks within their respective markets.",
  },
  {
    title: "Tailored Membership Plans",
    body: "We offer flexible membership options to meet the diverse needs of businesses, whether you’re a small supplier, an expanding buyer, or an intermediary managing complex supply chain logistics. Each plan provides varying levels of access to our platform’s premium features, such as enhanced analytics, market insights, and consortium management tools.",
  },
];

export const AboutPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="About Us" route="/ about" />
      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <AboutUsSection />
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <OurVisionSection />
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto">
        <h1 className="text-[18px] font-medium text-qblack mb-2.5">
          What we offer
        </h1>

        <div className="flex flex-col items-center w-full justify-center">
          {offers.map((offer) => (
            <OfferComponent item={offer} />
          ))}
        </div>
      </div>
      <div>
        <CustomerFeedback />
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto my-14"></div>
    </div>
  );
};
