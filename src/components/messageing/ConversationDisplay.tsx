// import { useState } from "react";
import ConversationCard, { IConversation } from "./ConversationCard";

import { useEffect, useState } from "react";
import socket from "@/service/socketmessaging";

const ConversationDisplay = () => {
  const [conversations, setConversations] = useState<IConversation[] | null>(
    null
  );

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err.message); // Logs connection errors
    });

    socket.emit("getConversations");

    socket.on("conversations", (d) => {
      setConversations(d);
    });

    return () => {
      socket.off("conversations", (d) => {
        setConversations(d);
      });
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full">
        <h2 className="text-lg font-semibold mb-4">My Messages</h2>
      </div>
      <div className="flex gap-y-2 flex-col">
        {!conversations && <div>Loading conversations</div>}

        {conversations &&
          conversations?.map((c) => <ConversationCard {...c} />)}
      </div>
    </div>
  );
};

export default ConversationDisplay;
