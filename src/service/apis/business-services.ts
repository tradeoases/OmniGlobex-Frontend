import request from "../base.service";

export interface IBusiness {
  businessName: string;
  countryId: string;
  location: string;
  businessDescription: string;
}

export const createBusiness = async (business: IBusiness) =>
  await request.post(`business/`, business);

export const getBusinesses = async () => await request.get(`business/`);

export const getBusinessById = async (businessId: string) => {
  const response = await request.get(`/business/${businessId}`);
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBusinessUser = async (businessId: string, userData: any) => {
  await request.post(`/business/${businessId}/users`, userData);
};



export const saveSubscription = async () =>
  await request.post("/subscription/save-subscription");

export const getSubscriptionDetails = async () =>
  await request.get("/subscription/get-subscriptions");
export const createClientSecret = async () =>
  await request.post("/subscription/add-payment-methods");
export const getAllPaymentMethods = async () =>
  await request.get("/subscription/get-payment-methods");
