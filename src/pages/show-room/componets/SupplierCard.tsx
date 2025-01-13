import { Button } from "@/components/ui/button";
import { getOneCountry } from "@/service/apis/countries-services";
import { createConversation } from "@/service/apis/message-service";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface ISupplier {
  business_id: string;
  business_name: string;
  location: { country_id: string; city: string };
  images: {
    image_url: string;
    thumbnail_url: string;
    image_for: "LOGO" | "PROFILE" | "COVER";
  }[];
}

const SupplierCard: React.FC<{ supplier: ISupplier }> = ({ supplier }) => {
  const navigate = useNavigate();
  const { data: country, isSuccess: isCountrySuccess } = useQuery({
    queryKey: ["country", supplier.location.country_id],
    queryFn: async () => {
      const res = await getOneCountry(supplier.location.country_id);
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data;
      }
    },
  });

  const handleStartConversation = async (id: string) => {
    const res = await createConversation({
      id,
      type: "DIRECT",
    });
    if (
      res.status === HttpStatusCode.Created ||
      res.status === HttpStatusCode.Ok
    ) {
      const r = res.data.data
      console.log({r})
      navigate(`/buyer-dashboard/messages/${r.id}`);
    }
  };

  return (
    <div className="max-w-sm rounded p-2 my-2 overflow-hidden shadow-lg bg-white">
      <div className="flex items-center">
        {/* Profile Image */}
        {supplier.images.length > 0 &&
          supplier.images.find((i) => i.image_for === "PROFILE")
            ?.thumbnail_url && (
            <img
              className="w-20 h-20 rounded-full object-cover bg-slate-400 mr-4"
              src={`${
                supplier.images.find((i) => i.image_for === "COVER")
                  ?.thumbnail_url
              }`}
              alt={`Profile of ${supplier.business_name}`}
            />
          )}
        {(supplier.images.length === 0 ||
          !supplier.images.find((i) => i.image_for === "PROFILE")
            ?.thumbnail_url) && (
          <div className="w-20 h-20 flex justify-center items-center rounded-full object-cover bg-slate-400 mr-4">
            No Profile
          </div>
        )}
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-2">{supplier.business_name}</h2>
          <p className="text-gray-700">
            Location: {supplier.location.city},{" "}
            {isCountrySuccess && country.name}
          </p>
        </div>
      </div>
      <Button
        className="mx-4 w-full mt-4"
        onClick={() => handleStartConversation(supplier.business_id)}
      >
        Start A Conversation
      </Button>
    </div>
  );
};

export default SupplierCard;
