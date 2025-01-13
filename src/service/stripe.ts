import { loadStripe } from "@stripe/stripe-js";

export const getStripe = async () =>
  await loadStripe(
    "pk_test_51Q2zWw2M3vteCiS3vLksPKi3ErdlIEHb2ewnAvyMBPYNclhFK7Pv2NvoyxtTWv9z2Ph8m3RvKlTFkg6JBuDUn8bM00KlgoJ0sq"
  );
