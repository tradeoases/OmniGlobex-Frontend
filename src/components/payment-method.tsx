import React from "react";
import { Button } from "./ui/button";
import { bankAccounts, IBankAccount } from "@/data/data";

export const PaymentMethod = () => {
  return (
    <div className="lg:col-span-3 w-full p-8 space-y-8 bg-white">
      <div className="w-full">
        {bankAccounts.map((bank, i) => (
          <PaymentMethodCard {...bank} key={i} />
        ))}
      </div>

      <div className="flex items-center gap-x-2">
        <Button className="rounded-none shadow-none ">Add Card</Button>
        <Button
          variant="secondary"
          className="rounded-none shadow-none border border-black text-black"
        >
          Add Bank
        </Button>
      </div>
    </div>
  );
};

const PaymentMethodCard: React.FC<IBankAccount> = ({
  bankDetails,
  bankName,
  status,
  img,
}) => {
  return (
    <div className="flex flex-col md:flex-row border-b md:p-8 py-8 space-y-4 hover:bg-gray-50 md:items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div className="w-20 h-20 md:w-32 md:h-32  bg-gray-200 flex items-center justify-center rounded-full">
          <img
            src={img}
            alt={bankName}
            className="w-12 h-12 md:w-20 md:h-20 object-contain"
          />
        </div>
        <div>
          <p className="text-md md:text-xl font-medium">{bankName}</p>
          <p className="text-xs">{bankDetails}</p>
          <p className="text-green-500 text-xs">{status}</p>
        </div>
      </div>

      <div>
        <Button className="bg-main text-black rounded-none shadow-none">
          Manage
        </Button>
      </div>
    </div>
  );
};
