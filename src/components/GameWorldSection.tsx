import { IProduct } from "@/service/apis/product-services";
import { GameSectionSidebar } from "./game-section-side-bar";

interface Props {
  name: string;
  route?: string;
  products?: IProduct[] | null;
}

const GameWorldSection: React.FC<Props> = ({ name }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      {/* Header Section */}
      <div className="bg-[#f7f7f7] p-2 sm:p-4 border-b rounded-t-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {name}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-4">
        <GameSectionSidebar />
      </div>
    </div>
  );
};

export default GameWorldSection;
