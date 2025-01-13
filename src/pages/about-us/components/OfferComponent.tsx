export type OfferType = {
  title: string;
  body: string;
};

const OfferComponent = ({ item }: { item: OfferType }) => {
  return (
    <div className="w-full lg:flex lg:space-x-12 items-center lg:pb-0">
      <div className="content flex-1 ">
        <strong className="text-sm leading-7 text-gray-500 mt-4 mb-4">
          {item.title}
        </strong>
        <p className="text-sm leading-7 text-gray-500">{item.body}</p>
      </div>
    </div>
  );
};

export default OfferComponent;
