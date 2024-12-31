import { saveSubscription } from "@/service/apis/business-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StripeSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const caller = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: AxiosResponse<any, any> = await saveSubscription();
        if (
          response.status === HttpStatusCode.Ok ||
          response.status === HttpStatusCode.Created
        ) {
          navigate("/supplier-dashboard");
        }
      } catch (e) {
        console.error(e);
      }
    };
    caller();
  }, []);

  return <div>StripeSuccessPage</div>;
};

export default StripeSuccessPage;
