import { IProduct } from "@/service/apis/product-services";
import { SectionHeader } from "./GameWorldSection";
import { Link } from "react-router-dom";

interface Props {
  products: IProduct[] | null;
}

const PopularSales: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-full space-y-3">
      <SectionHeader name="Popular Sales" route="" view={true} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products ? (
          products
            .slice(0, 8)
            .map((product, i) => <PopularSaleItem key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default PopularSales;

const PopularSaleItem: React.FC<IProduct> = ({
  description,
  image_url,
  product_id,
  name,
}) => {
  return (
    <Link
      to={`/single-product/?product_id=${product_id}`}
      className="p-4 py-3 border-b border-light w-full grid grid-cols-12 bg-white gap-x-3"
    >
      <img className="object-cover col-span-3" src={image_url} alt={name} />

      <div className="col-span-9 flex flex-col justify-center">
        <p className="line-clamp-2 text-xs font-bold">{description}</p>
        <p className="text-sm font-bold flex items-center gap-2">
          <span className="line-through text-gray-400">$ 20.12</span>
          <span className=" text-red-500">$18</span>
        </p>
      </div>
    </Link>
  );
};
