export const UnderConstruction = () => {
  return (
    <div className="col-span-3 h-[30vh] flex items-center justify-center">
      <p className=" text-gray-500 flex gap-4 items-center">
        <span className="text-3xl text-gray-300">🚧</span>
        <span className="animate-pulse font-semibold text-2xl">
          under construction
        </span>
      </p>
    </div>
  );
};
