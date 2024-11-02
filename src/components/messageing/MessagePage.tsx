import { Outlet, useParams } from "react-router-dom";
import ConversationDisplay from "./ConversationDisplay";

const MessagePage = () => {
  const { convId } = useParams();

  return (
    <div className="flex flex-col md:flex-row w-full mt-10 h-[calc(100vh-4rem-3rem)]">
      <div
        className={`${
          !convId ? "block" : "hidden md:block"
        } md:w-1/3 w-full h-full border-r`}
      >
        <div className="h-full overflow-hidden flex flex-col bg-white shadow rounded">
          <ConversationDisplay />
        </div>
      </div>
      <div
        className={`${
          convId ? "block" : "hidden md:block"
        } md:w-2/3 w-full h-full`}
      >
        <div className="h-full bg-white shadow rounded overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
