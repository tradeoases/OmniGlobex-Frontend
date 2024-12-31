interface Props {}

export const ProductSellerInfoTab: React.FC<Props> = () => {
  return (
    <div className="w-full space-y-20">
      <div className=" space-y-10 lg:flex items-center justify-between border-b pb-8">
        <div className="flex items-center gap-x-4">
          <img
            src="https://ik.imagekit.io/2ujnunod7moo/profile1_6ynm5mYwy.jpeg?updatedAt=1691099202935"
            alt="seller"
            className="w-16 h-16 rounded-full bg-contain"
          />

          <div className="space-y-3 ml-4">
            <p className="text-md font-semibold">Ridoy Rock</p>
            <p className="text-sm font-light">London,United Kingdom</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-xl text-main">
                    ★
                  </span>
                ))}
              </div>
              <span>(4.5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
