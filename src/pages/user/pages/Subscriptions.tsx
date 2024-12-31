/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  getAllPaymentMethods,
  getSubscriptionDetails,
} from "@/service/apis/business-services";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import AddPaymentMethod from "../supplier-profile/add-credit-card";
import { Card } from "@/components/ui/card";
import MembershipPlansTable from "../supplier-profile/SubscriptionTable";

const Subscriptions = () => {
  const {
    data: BusinessSubscription,
    isLoading: subscriptionLoading,
    isSuccess: subscriptionSuccess,
    isError: isSubscriptionError,
    error: subscriptionError,
  } = useQuery({
    queryKey: ["subscriptions-details"],
    queryFn: async () => {
      const response = await getSubscriptionDetails();
      if (response.status === 200) {
        return response.data.data;
      }
    },
  });

  const {
    data: paymentMethods,
    isLoading: methodsLoading,
    isSuccess: methodsSuccess,
    isError: isMethodsError,
    error: methodError,
  } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const response = await getAllPaymentMethods();
      if (response.status === 200) {
        return response.data.data;
      }
    },
  });
  console.log({ paymentMethods });

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-8">Subscriptions</h1>

      {openCreateModal && (
        <AddPaymentMethod onClose={() => setOpenCreateModal(false)} />
      )}

      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-4">Subscription Details</h2>

        {subscriptionSuccess &&
          BusinessSubscription.map((sub: any) => (
            <Card key={sub.id} className="p-6 mb-4 shadow-lg">
              <h3 className="text-lg font-semibold">{sub.plan.productName}</h3>
              <p className="text-gray-600">{sub.plan.productDescription}</p>
              <p className="mt-2">
                {sub.plan.interval}ly charges: {sub.plan.currency}{" "}
                {sub.plan.amount}
              </p>
              <p>Status: {sub.trial ? "On Trial" : "Active"}</p>
              <p>
                Period Started: {moment.unix(sub.start).format("Do MMMM YYYY")}
              </p>
              <p>Period Ends: {moment.unix(sub.end).format("Do MMMM YYYY")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                <Button className="w-full" disabled>
                  Upgrade Subscription
                </Button>
                <Button className="w-full" disabled>
                  Downgrade Subscription
                </Button>
                <Button className="w-full" disabled>
                  Cancel Subscription
                </Button>
              </div>
            </Card>
          ))}

        {isSubscriptionError && (
          <div className="text-red-600">
            <p>An error occurred while loading subscriptions.</p>
            <p>
              {subscriptionError.name} - {subscriptionError.message}
            </p>
          </div>
        )}

        {subscriptionLoading && <p>Loading subscription details...</p>}
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-4">Payment Methods</h2>

        {isMethodsError && (
          <div className="text-red-600">
            <p>An error occurred while loading payment methods.</p>
            <p>
              {methodError.name} - {methodError.message}
            </p>
          </div>
        )}

        {methodsLoading && <p>Loading payment methods...</p>}

        {methodsSuccess &&
          paymentMethods.map((meth: any) => (
            <Card key={meth.id} className="p-6 mb-4 shadow-lg">
              <h3 className="text-lg font-semibold">Brand: {meth.brand}</h3>
              <p>Last four digits: **** {meth.last4}</p>
              <p>
                Expiry date: {meth.expMonth}/{meth.expYear}
              </p>
              <p>Name: {meth.billingName}</p>
              <p>Email: {meth.billingEmail}</p>
              <div className="flex gap-x-3 mt-4">
               
                
                <Button className="w-full" disabled>
                  Remove Payment Method
                </Button>
              </div>

            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="w-full" onClick={() => setOpenCreateModal(true)}>
          Add Payment Method
        </Button>
      </div>
      <MembershipPlansTable />
    </div>
  );
};

export default Subscriptions;
