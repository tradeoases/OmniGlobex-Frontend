import bestQualityIcon from "@/assets/best-quality.svg";
import freeReturnIcon from "@/assets/free-return.svg";
import freeShippingIcon from "@/assets/free-shipping.svg";
import securepaymentIcon from "@/assets/secure-payment.svg";

const ServicesBanner = () => {
  return (
    <div className="w-10/12 xl:w-8/12 mx-auto">
      <div
        data-aos="fade-down"
        className="best-services w-full bg-main flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10 aos-init aos-animate"
      >
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <img src={freeShippingIcon} alt="freeShipping" />
              </span>
            </div>
            <div>
              <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                Free Shipping
              </p>
              <p className="text-sm text-qblack">When ordering over $100</p>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <img src={freeReturnIcon} alt="freeReturn" />
              </span>
            </div>
            <div>
              <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                Free Return
              </p>
              <p className="text-sm text-qblack">Get Return within 30 days</p>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <img src={securepaymentIcon} alt="securePayment" />
              </span>
            </div>
            <div>
              <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                Secure Payment
              </p>
              <p className="text-sm text-qblack">100% Secure Online Payment</p>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <img src={bestQualityIcon} alt="bestQlty" />
              </span>
            </div>
            <div>
              <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                Best Quality
              </p>
              <p className="text-sm text-qblack">Original Product Guarenteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesBanner;
