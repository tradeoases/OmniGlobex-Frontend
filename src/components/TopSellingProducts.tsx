import { IProduct } from "@/service/apis/product-services";
import { TopSellingCard } from "./top-selling-card";
import { SectionHeader } from "./section-header";

interface Props {
  products?: IProduct[] | null;
}

const TopSellingProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-full space-y-2">
      <div className="p-2 pb-3 bg-slate-700">
        <SectionHeader
          name="Featured Products"
          classList="text-white"
          view={true}
          route=""
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products ? (
          products
            .slice(0, 4)
            .map((product, i) => <TopSellingCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;
