import CustomerFeedbackCard, {
  CustomerFeedbackType,
} from "./customer-feedback-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const customerFeedbackData: CustomerFeedbackType[] =[
  {
    rating: 5,
    message: "Amazing service! Highly recommend.",
    customerName: "John Doe",
    customerLocation: "New York, USA",
    feedBackId: "fb001",
    customerProfile: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    rating: 4,
    message: "Good experience overall.",
    customerName: "Jane Smith",
    customerLocation: "London, UK",
    feedBackId: "fb002",
    customerProfile: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    rating: 3,
    message: "It was okay, but can be improved.",
    customerName: "Robert Johnson",
    customerLocation: "Berlin, Germany",
    feedBackId: "fb003",
    customerProfile: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    rating: 5,
    message: "Exceeded my expectations!",
    customerName: "Emily Davis",
    customerLocation: "Paris, France",
    feedBackId: "fb004",
    customerProfile: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
  },
  {
    rating: 2,
    message: "Not satisfied with the service.",
    customerName: "Michael Brown",
    customerLocation: "Toronto, Canada",
    feedBackId: "fb005",
    customerProfile: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
  },
  {
    rating: 4,
    message: "Very helpful and responsive team.",
    customerName: "Sophia Wilson",
    customerLocation: "Sydney, Australia",
    feedBackId: "fb006",
    customerProfile: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
  },
  {
    rating: 3,
    message: "Average experience.",
    customerName: "David Clark",
    customerLocation: "Dublin, Ireland",
    feedBackId: "fb007",
    customerProfile: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    rating: 5,
    message: "Fantastic support and product quality!",
    customerName: "Olivia Martinez",
    customerLocation: "Madrid, Spain",
    feedBackId: "fb008",
    customerProfile: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
  },
  {
    rating: 4,
    message: "Quick and efficient service.",
    customerName: "Ethan Lewis",
    customerLocation: "Amsterdam, Netherlands",
    feedBackId: "fb009",
    customerProfile: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
  },
  {
    rating: 2,
    message: "Disappointed with the service.",
    customerName: "Ava Harris",
    customerLocation: "Cape Town, South Africa",
    feedBackId: "fb010",
    customerProfile: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg"
  }
];

const CustomerFeedback = () => {
  return (
    <div className="bg-white py-14">
      <div className="text-3xl font-bold w-full text-center mb-7">
        Customers Feedback
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {customerFeedbackData.map((feedback) => (
              <CarouselItem
                key={feedback.feedBackId}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <CustomerFeedbackCard feedback={feedback} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerFeedback;
