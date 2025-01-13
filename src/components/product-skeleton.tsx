export const ProductSkeleton = () => {
  return (
    <div className="mx-auto h-80 w-64 space-y-3 rounded-xl border bg-white p-4 shadow">
      <div className="h-3/5 w-56 rounded-lg bg-gray-100"></div>

      <p className="h-4  w-5/6 rounded-lg bg-gray-50"></p>
      <p className="h-2 w-1/2 rounded-lg bg-gray-100"></p>
      <p className="line-clamp-1 h-2 w-full rounded-lg bg-gray-50"></p>

      <p className="h-10 w-full rounded-lg bg-gray-100"></p>
    </div>
  );
};
