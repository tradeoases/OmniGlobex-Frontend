import { useState } from "react";
import { StarIcon } from "lucide-react";

interface Buyer {
  id: string;
  name: string;
  transactionDate: string;
  transactionId: string;
  rating?: number;
  feedback?: string;
}

const SupplierRatings = () => {
  // Mock data - replace with actual API data
  const [buyers, setBuyers] = useState<Buyer[]>([
    {
      id: "1",
      name: "John Smith",
      transactionDate: "2024-03-15",
      transactionId: "TRX-001",
      rating: 4,
      feedback: "Great communication and prompt payment.",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      transactionDate: "2024-03-10",
      transactionId: "TRX-002",
    },
    {
      id: "3",
      name: "Arno Jack",
      transactionDate: "2024-03-10",
      transactionId: "TRX-002",
    },
    // Add more buyers as needed
  ]);

  const handleRatingSubmit = (
    buyerId: string,
    rating: number,
    feedback: string
  ) => {
    setBuyers((prevBuyers) =>
      prevBuyers.map((buyer) =>
        buyer.id === buyerId ? { ...buyer, rating, feedback } : buyer
      )
    );
    // Add API call to save rating
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Buyer Ratings
        <div className="h-1 w-20 bg-main mt-2 rounded-full"></div>
      </h2>

      <div className="space-y-4">
        {buyers.map((buyer) => (
          <div
            key={buyer.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {buyer.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Transaction ID: {buyer.transactionId}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(buyer.transactionDate).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                {buyer.rating ? (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 ${
                          index < buyer.rating!
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <RatingForm
                    onSubmit={(rating, feedback) =>
                      handleRatingSubmit(buyer.id, rating, feedback)
                    }
                  />
                )}
              </div>
            </div>

            {buyer.feedback && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "{buyer.feedback}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface RatingFormProps {
  onSubmit: (rating: number, feedback: string) => void;
}

const RatingForm = ({ onSubmit }: RatingFormProps) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 text-sm bg-main text-white rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Rate Buyer
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className="focus:outline-none"
              >
                <StarIcon
                  className={`h-6 w-6 ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-400 transition-colors`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add your feedback..."
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            rows={3}
          />

          <div className="flex space-x-2">
            <button
              onClick={() => {
                onSubmit(rating, feedback);
                setIsFormOpen(false);
              }}
              disabled={!rating}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              Submit
            </button>
            <button
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierRatings;
