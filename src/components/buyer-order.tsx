import { Button } from "./ui/button";

export const BuyerOrder = () => {
  return (
    <div className="overflow-x-auto">
      {" "}
      {/* Added scrollable container */}
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead>
          <tr className="text-base text-gray-700 border-t border-b default-border-bottom">
            {orderHeader.map((header, i) => (
              <th key={i} className="py-4 px-6 whitespace-nowrap text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={i}
              className="bg-white text-center border-b hover:bg-gray-50"
            >
              <td className="py-4 px-6 text-lg text-gray-600 font-medium">
                {order.orderNumber}
              </td>
              <td className="py-4 px-6">
                <span className="text-base text-gray-500 whitespace-nowrap">
                  {order.date}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm rounded text-green-500 bg-green-100 py-1 px-3">
                  {order.status}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="text-base text-gray-500 whitespace-nowrap">
                  {order.amount}
                </span>
              </td>
              <td className="py-4 px-6">
                <Button className="text-xs shadow-none rounded-none text-black bg-main font-bold px-4 py-2">
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const orderHeader = ["Order", "Date", "Status", "Amount", "Action"];

interface Order {
  orderNumber: string;
  date: string;
  status: string;
  amount: string;
}

const orders: Order[] = [
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#355",
    date: "Mar 10, 2021",
    status: "Processing",
    amount: "$850",
  },
  // ...additional order data
];
