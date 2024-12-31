import { PageHeader } from "@/components/PageHeader";
import FaqCard from "@/components/faq-question-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import request from "@/service/base.service";
import { useQuery } from "@tanstack/react-query";

const FaqPage = () => {
  const {
    data: faq,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const faqRes = await request.get("content/faqs");
      if (faqRes.status === 200) {
        return faqRes.data.data;
      }
    },
  });
  console.log({ error });

  return (
    <div className="w-full">
      <PageHeader name="Frequently asked questions" route="/ FAQ" />
      <div className="my-10 w-10/12 xl:w-8/12 mx-auto">
        <div className="w-full flex flex-col md:flex-row justify-between gap-7">
          <div className="w-full md:w-1/2">
            <h1 className="text-[22px] font-semibold text-qblack leading-[30px] mb-6">
              Frequently asked questions
            </h1>
            <div>
              {isLoading && <div>Loading...</div>}
              {isError && (
                <div>
                  <p>An error occured</p>
                  <p>{error.message}</p>
                </div>
              )}

              {isSuccess && (
                <Accordion type="single" collapsible className="w-full">
                  {faq.map(
                    (fa: { question: string; id: number; answer: string }) => (
                      <AccordionItem key={fa.id} value={`item-${fa.id}`}>
                        <AccordionTrigger>
                          <h1 className="text-lg">{fa.question}</h1>
                        </AccordionTrigger>
                        <AccordionContent>{fa.answer}</AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 ">
            <FaqCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
