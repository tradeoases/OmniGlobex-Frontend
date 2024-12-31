import { useState } from 'react';
import { StarIcon } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  rfqNumber: string;
  completionDate: string;
  productName: string;
  rating?: number;
  feedback?: string;
  status: 'completed' | 'in_progress';
}

const BuyerRatings = () => {
  // Mock data - replace with actual API data
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'Tech Solutions Ltd',
      rfqNumber: 'RFQ-2024-001',
      completionDate: '2024-03-15',
      productName: 'Industrial Sensors',
      rating: 4,
      feedback: 'Quality products and excellent service. Delivery was on time.',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Global Manufacturing Co',
      rfqNumber: 'RFQ-2024-002',
      completionDate: '2024-03-18',
      productName: 'Machine Parts',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Industrial Supplies Inc',
      rfqNumber: 'RFQ-2024-003',
      completionDate: '2024-03-20',
      productName: 'Electronic Components',
      status: 'in_progress'
    }
  ]);

  const handleRatingSubmit = (supplierId: string, rating: number, feedback: string) => {
    setSuppliers(prevSuppliers =>
      prevSuppliers.map(supplier =>
        supplier.id === supplierId
          ? { ...supplier, rating, feedback }
          : supplier
      )
    );
    // Add API call to save rating
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Supplier Ratings
        <div className="h-1 w-20 bg-main mt-2 rounded-full"></div>
      </h2>

      <div className="space-y-4">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="space-y-2 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 break-words">
                    {supplier.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full w-fit ${
                    supplier.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {supplier.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    <p className="flex items-center">
                      <span className="font-medium mr-2">RFQ:</span>
                      {supplier.rfqNumber}
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Product:</span>
                      {supplier.productName}
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Completed:</span>
                      {new Date(supplier.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                {supplier.status === 'completed' && (
                  supplier.rating ? (
                    <div className="space-y-2">
                      <div className="flex items-center sm:justify-end space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`h-5 w-5 ${
                              index < supplier.rating!
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 block">
                        Rated {supplier.rating}/5
                      </span>
                    </div>
                  ) : (
                    <RatingForm
                      onSubmit={(rating, feedback) =>
                        handleRatingSubmit(supplier.id, rating, feedback)
                      }
                    />
                  )
                )}
              </div>
            </div>

            {supplier.feedback && (
              <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Your Feedback:</span>
                  <span className="italic ml-2 break-words">"{supplier.feedback}"</span>
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
  const [feedback, setFeedback] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full sm:w-auto">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto px-4 py-2 text-sm bg-main text-white rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Rate Supplier
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-1 justify-center sm:justify-end">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className="focus:outline-none p-1"
              >
                <StarIcon
                  className={`h-8 w-8 sm:h-6 sm:w-6 ${
                    index < rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                />
              </button>
            ))}
          </div>
          
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience with this supplier..."
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            rows={3}
          />
          
          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
            <button
              onClick={() => {
                onSubmit(rating, feedback);
                setIsFormOpen(false);
              }}
              disabled={!rating}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-main text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-300"
            >
              Submit Rating
            </button>
            <button
              onClick={() => setIsFormOpen(false)}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerRatings; 