import {
  SiAmazon,
  SiApple,
  SiBlackberry,
  SiEpson,
  SiMicrosoft,
  SiNokia,
  SiOneplus,
  SiOppo,
  SiPanasonic,
  SiSamsung,
  SiVivo,
  SiXiaomi,
} from "react-icons/si";

import { SectionHeader } from "./section-header";

const ShopBrandSection = () => {
  return (
    <div className="w-full">
      <div className="bg-main p-2 pb-3 ">
        <SectionHeader name="Explore our suppliers" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 child">
        {brands.map((item, i) => (
          <div
            key={i}
            className="w-full hover: border-[0.1px] border-light py-8 bg-white flex items-center justify-center"
          >
            <p className="text-3xl font-bold  text-gray-600">{item.icon}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopBrandSection;

const brands = [
  { name: "", icon: <SiNokia /> },
  { name: "", icon: <SiSamsung /> },
  { name: "", icon: <SiApple /> },
  { name: "", icon: <SiAmazon /> },
  { name: "", icon: <SiMicrosoft /> },
  { name: "", icon: <SiXiaomi /> },
  { name: "", icon: <SiOppo /> },
  { name: "", icon: <SiVivo /> },
  { name: "", icon: <SiOneplus /> },
  { name: "", icon: <SiPanasonic /> },
  { name: "", icon: <SiBlackberry /> },
  { name: "", icon: <SiEpson /> },
];
