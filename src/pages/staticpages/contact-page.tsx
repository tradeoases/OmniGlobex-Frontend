import { ImLocation } from "react-icons/im";
import { CgPhone } from "react-icons/cg";
import { PageHeader } from "@/components/PageHeader";
import GetInTouchCard from "@/components/get-in-touch-card";
import { FaEnvelope } from "react-icons/fa6";

const ContactPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Contact" route="/ Contact" />
      <div className="my-10 w-10/12 xl:w-8/12 mx-auto">
        <div className="w-full flex flex-col lg:flex-row justify-between gap-7">
          <div className="w-full lg:w-1/2">
            <h1 className="text-base font-semibold text-black mb-1">
              Contact Information
            </h1>
            <p className="text-sm text-gray-400 mb-5">
              Fill the form below or write to us. We will help you as soon as
              possible.
            </p>
            <div className="xl:flex xl:space-x-7 mb-7">
              <div className="xl:w-1/2 w-full h-48 space-y-3 flex flex-col item justify-center bg-pink-100 p-5">
                <div className="flex justify-center">
                  <span className="w-11 h-11 rounded-full border border-main text-main text-2xl flex items-center justify-center">
                    <CgPhone />
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-base text-black text-center font-semibold">
                    Phone
                  </p>
                  <p className="text-black text-center">+(323) 9847 3847 383</p>
                  <p className="text-black text-center">+(434) 5466 5467 443</p>
                </div>
              </div>

              <div className="xl:w-1/2 w-full h-48 space-y-3 flex flex-col item justify-center bg-blue-100 p-5">
                <div className="flex justify-center ">
                  <span className="w-11 h-11 rounded-full border border-main text-main text-2xl flex items-center justify-center">
                    <FaEnvelope />
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-base text-black text-center font-semibold">
                    Email
                  </p>
                  <p className="text-black text-center">Demoemail@gmail.com</p>
                  <p className="text-black text-center">
                    rafiqulislamsuvobd@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between w-full bg-green-50">
              <div className="flex space-x-5">
                <span className="w-11 h-11 rounded-full border border-main text-main text-2xl flex items-center justify-center">
                  <ImLocation />
                </span>

                <div>
                  <h1 className="text-[22px] font-semibold text-black mb-2">
                    Address
                  </h1>
                  <p className="text-sm text-black leading-7">
                    4517 Washington Ave. Manchester, Road 2342, <br />
                    Kentucky 39495
                  </p>
                </div>
              </div>
              <div className="w-full h-[206px] mt-5 ">
                <iframe
                  title="newWork"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.94539481518!2d-74.26675559025064!3d40.69739290398433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1656755618576!5m2!1sen!2sbd"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 ">
            <GetInTouchCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
