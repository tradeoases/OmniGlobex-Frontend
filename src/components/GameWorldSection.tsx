import { IProduct } from "@/service/apis/product-services";
// import { ProductCard } from "./product-card";
import { GameSectionSidebar } from "./game-section-side-bar";
// import { ProductSkeleton } from "./product-skeleton";
import { SectionHeader } from "./section-header";

interface Props {
  name: string;
  route?: string;
  products?: IProduct[] | null;
}

const GameWorldSection: React.FC<Props> = ({ name }) => {


  

  return (
    <div className="w-full pt-8 space-y-3 bg-slate-950 p-8">
      <SectionHeader classList="text-white" name={name} view={false} />
      {/* <div className="hidden lg:grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
      </div> */}
        <GameSectionSidebar />

      {/* <div className="lg:hidden space-y-8">
        <GameSectionSidebar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products
            ? products
                .slice(0, 2)
                .map((product, i) => <ProductCard key={i} {...product} />)
            : Array.from({ length: 2 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
        </div>
      </div> */}
    </div>
  );
};

export default GameWorldSection;
