import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbTruckDelivery } from "react-icons/tb";

const TrackOrderPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Track Order" route="/Track Order" />
      <div className="mx-auto w-8/12 sm:w-">
        <div>
          <h2 className="text-2xl font-bold sm:text-xl">Track Your Order</h2>
          <p className=" text-gray-400 pt-2">
            Enter your tracking number and your discreet id.
          </p>
        </div>
        <br></br>
        <div className="md:flex w-full gap-24 bg-white pt-5 pl-5 pb-7 pr-3">
          <form className="sm:w-screen sm:mr-5">
            <Label htmlFor="order tracking number">
              Order Tracking Number*
            </Label>
            <Input
              type="text"
              className="focus:outline-none"
              placeholder="Order Number"
            />
            <br></br>
            <Label htmlFor="delivery date">Delivery Date</Label>
            <Input type="text" className="" placeholder="02/06/2024" />
            <br></br>
            <Button className="">Track Now</Button>
          </form>
          <div className="hidden sm:block w-5/12">
            <TbTruckDelivery
              className=""
              size={200}
              style={{ color: "gray" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
