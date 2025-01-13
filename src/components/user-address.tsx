import React from "react";
import { GoTrash } from "react-icons/go";
import { Button } from "./ui/button";

export const UserAddress = () => {
  return (
    <div className="lg:col-span-3 md:p-8 md:bg-white space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address, i) => (
          <AddressCard key={i} no={i + 1} address={address} />
        ))}
      </div>

      <div>
        <Button className="bg-main shadow-none rounded-none text-black">
          Add New Address
        </Button>
      </div>
    </div>
  );
};

interface Props {
  no: number;
  address: IAddress;
}

const AddressCard: React.FC<Props> = ({ no, address }) => {
  return (
    <div className="border p-4 bg-white md:bg-light space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Address #{no}</p>
        <p className="w-7 h-7 rounded-full border flex items-center justify-center">
          <GoTrash className="text-lg text-red-500" />
        </p>
      </div>

      <div className="space-y-2">
        {Object.entries(address).map(([key, value], i) => (
          <p key={i} className="text-gray-400 grid grid-cols-4 gap-4">
            <span className="text-black">{key}:</span>
            <span className="col-span-3 whitespace-nowrap line-clamp-1">
              {value}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

interface IAddress {
  Name: string;
  Email: string;
  Phone: string;
  country: string;
  state: string;
  City: string;
}

const addresses: IAddress[] = [
  {
    Name: "Shuvo Khan",
    Email: "rafiqulislamsuvobd@gmail.com",
    Phone: "01792166627",
    country: "Dhaka,Bangldesh",
    state: "Barishal",
    City: "banaripara",
  },
  {
    Name: "Shuvo Khan",
    Email: "rafiqulislamsuvobd@gmail.com",
    Phone: "01792166627",
    country: "Dhaka,Bangldesh",
    state: "Barishal",
    City: "banaripara",
  },
];
