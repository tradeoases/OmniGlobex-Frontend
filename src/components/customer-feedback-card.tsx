export type CustomerFeedbackType = {
  rating: number;
  message: string;
  customerName: string;
  customerLocation: string;
  feedBackId: string;
  customerProfile: string;
};

type CustomerFeedbackProps = {
  feedback: CustomerFeedbackType;
};

const CustomerFeedbackCard = ({ feedback }: CustomerFeedbackProps) => {
  return (
    <div>
      <div className="item h-80 md:h-96  bg-gray-100 sm:px-10 sm:py-9 p-2">
        <div className="flex flex-col justify-between h-full">
          <div className="rating flex space-x-1 items-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: feedback.rating }).map((_, i) => (
                <span key={i} className="text-xl text-main">
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-qblack">({feedback.rating})</span>
          </div>
          <div className="text-sm text-gray-500 leading-[30px] text-justify line-clamp-6">
            {feedback.message}
          </div>
          <div className="flex items-center space-x-2.5 mt-3">
            
              <img className="rounded-full w-10 h-10" src={feedback.customerProfile} alt={feedback.customerLocation + "'s image"}/>
            
            <div>
              <p className="text-[18px] text-qblack font-medium">
                {feedback.customerName}
              </p>
              <p className="text-gray-500 text-[13px]">
                {feedback.customerLocation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedbackCard;
