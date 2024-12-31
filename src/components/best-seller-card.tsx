import { IBestSeller } from "@/data/data";

export const BestSellerCard: React.FC<IBestSeller> = ({ name, image }) => {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <div className="w-20 h-20 md:w-28 border md:h-28 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center font-extrabold">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
        />
      </div>

      <p className="text-sm text-gray-700 font-semibold">{name}</p>
    </div>
  );
};
