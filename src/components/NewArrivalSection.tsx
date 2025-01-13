import { IProduct } from "@/service/apis/product-services";
import { ProductCard } from "./product-card";
import { SectionHeader } from "./section-header";

interface Props {
  products?: IProduct[] | null;
}

const NewArrivalSection: React.FC<Props> = ({ products }) => {
  console.log({products})
  return (
    <div className="w-full ">
      <div className="p-2 bg-main pb-3">
        <SectionHeader name="New Arrivals" view={true} />
      </div>
      <div className="grid p-2 border bg-gray-200 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products ? (
          products
            .slice(0, 4)
            .map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default NewArrivalSection;
