interface Props {
  reviewData: {
    hasComment: boolean;
  };
}

export const ReviewCardDetailed: React.FC<Props> = ({ reviewData }) => {
  return (
    <div className="py-4 px-4 w-full mb-8 ">
      <div className="space-y-1">
        <div className="flex justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-full bg-gray-700 w-10 h-10"></div>
            <div>
              <p className="text-[18px] text-qblack font-medium">Ridoy Rock</p>
              <p className="text-gray-500 text-[13px]">London,UK</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-xl text-main">
                ★
              </span>
            ))}
            <span className="ml-1">4.0</span>
          </div>
        </div>

        <p className="text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries but also the on leap into electronic typesetting,
          remaining essentially unchanged. It wasn’t popularised in the 1960s
          books.
        </p>
      </div>
      {reviewData.hasComment && (
        <div>
          <div className="space-y-1 ml-10 border-t pt-6 mt-6">
            <div className="flex justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="rounded-full bg-gray-700 w-10 h-10"></div>
                <div>
                  <p className="text-[18px] text-qblack font-medium">
                    Ridoy Rock
                  </p>
                  <p className="text-gray-500 text-[13px]">London,UK</p>
                </div>
              </div>
            </div>

            <p className="text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCardDetailed;
