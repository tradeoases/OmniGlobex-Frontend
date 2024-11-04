import socketService from "@/service/socketmessaging";
import ConversationCard, { IConversation } from "./ConversationCard";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";


const ConversationDisplay = () => {
  const [conversations, setConversations] = useState<IConversation[] | null>(null);
  const [socketError, setSocketError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    socketService.subscribeToErrors((errorMessage) => {
      setSocketError(errorMessage || null);
      setIsConnected(!errorMessage);
    });

    const socket = socketService.initializeSocket()
    if(socket) {

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
    }
  }, []);

  const handleManualReconnect = () => {
    socketService.reconnect();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">My Messages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
      {socketError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {socketError}
            {!isConnected && (
              <button 
                onClick={handleManualReconnect}
                className="ml-2 underline"
              >
                Try reconnecting now
              </button>
            )}
          </AlertDescription>
        </Alert>
      )}
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
