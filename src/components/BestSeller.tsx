import { bestSellers } from "@/data/data";
import { BestSellerCard } from "./best-seller-card";
import { SectionHeader } from "./section-header";

const BestSeller = () => {
  return (
    <div className="w-full space-y-6 bg-main p-8">
      <SectionHeader name="Best Saller" view={true} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 lg:grid-cols-6 gap-x-4">
        {bestSellers.map((saller, i) => (
          <BestSellerCard {...saller} key={i} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
