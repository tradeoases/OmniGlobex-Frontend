import { ReviewCard } from "./review-card";
export const ReviewsDashboard = () => {
  return (
    <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4 p-8 bg-white w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <ReviewCard key={i} />
      ))}
    </div>
  );
};
