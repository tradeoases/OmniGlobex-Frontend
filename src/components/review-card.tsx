export const ReviewCard = () => {
  return (
    <div className="shadow-xl flex items-center gap-x-4 py-4 px-4">
      <div className="w-40 h-32 bg-gray-100 flex items-center justify-center">
        <span>196X196</span>
      </div>
      <div className="space-y-1">
        <span className="text-qgray text-sm block">July 22, 2022</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-xl text-main">
              ★
            </span>
          ))}
        </div>
        <p className="title sm:text-[15px] font-bold text-[13px] font-600 text-qblack leading-[24px] line-clamp-1 hover:text-blue-600">
          Xoggle aute et pariatur adipisicing nostrud et excepteur
        </p>
        <p className="price font-light text-xs text-qgray line-clamp-2">
          Didnt I tell you not put your phone on charge because weekend?
        </p>
      </div>
    </div>
  );
};
