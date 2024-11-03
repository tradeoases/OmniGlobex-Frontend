import ConversationCard, { IConversation } from "./ConversationCard";

import { useEffect, useState } from "react";
import socket from "@/service/socketmessaging";


const ConversationDisplay = () => {
  const [conversations, setConversations] = useState<IConversation[] | null>(null);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
    });

    socket.emit("getConversations");
    
    socket.on("conversations", (d) => {
      setConversations(d);
    });

    return () => {
      socket.off("conversations");
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">My Messages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {!conversations && (
          <div className="flex items-center justify-center h-full">
            <div>Loading conversations...</div>
          </div>
        )}
        
        {conversations && conversations.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            No conversations yet
          </div>
        )}

        {conversations && (
          <div className="flex flex-col gap-2">
            {conversations.map((c) => (
              <ConversationCard key={c.id} {...c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationDisplay;
