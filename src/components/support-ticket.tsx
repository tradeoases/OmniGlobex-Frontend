import { Button } from "./ui/button";
import deleteIcon from "@/assets/deleteIcon.svg";
import mesageIcon from "@/assets/messageIcon.svg"

const SupportTicket = () => {
  return (
    <div className="col-span-3  relative w-full overflow-x-auto ">
      <Button className="rounded-none bg-main text-black hover:bg-main/80 shadow-none mb-5 h-12">
        Add New Support
      </Button>
      <table className="min-w-full  text-xs text-left text-gray-500 dark:text-gray-400 ">
        <tbody className="">
          <tr className="text-base text-gray-500 border-t whitespace-nowrap px-2 border-b default-border-bottom">
            {supportTicketsHeader.map((header, i) => (
              <th
                key={i}
                className="py-4  whitespace-nowrap text-center text-md"
              >
                {header}
              </th>
            ))}
          </tr>

          {supportTickets.map((ticket, i) => (
            <tr
              key={i}
              className="bg-white text-center border-b hover:bg-gray-50"
            >
              <td className="text-center py-4 px-4 min-w-28">
                <span className="text-xs font-normal">
                  {ticket.ticketNumber}
                </span>
              </td>
              <td className="text-center py-4 px-4 min-w-28 ">
                <span className="text-xs font-normal">{ticket.date}</span>
              </td>
              <td className="text-center py-4 px-4 min-w-40 ">
                <span className="text-xs font-normal  line-clamp-3">
                  {ticket.report}
                </span>
              </td>
              <td className="text-center py-4 px-4 ">
                <div className="flex justify-center ">
                  <div className="mr-4">
                    <button
                      type="button"
                      className="border border-qgray w-[34px] h-[34px] rounded-full flex justify-center items-center"
                    >
                      <img src={mesageIcon} alt="repot_ticket" />
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="border border-qgray w-[34px] h-[34px] rounded-full flex justify-center items-center"
                    >
                      <img src={deleteIcon} alt="delete_ticket" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTicket;

const supportTicketsHeader = ["No.", "Date", "Report", "Action"];

interface SupportTicket {
  ticketNumber: string;
  date: string;
  report: string;
}

const supportTickets: SupportTicket[] = [
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
  {
    ticketNumber: "#354",
    date: "Feb 05, 2021",
    report: "This is a test Report",
  },
];
