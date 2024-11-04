import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TiArrowLeftThick } from "react-icons/ti";
import { userStore } from "@/store/user-store";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import socketService from "@/service/socketmessaging";

interface IMessages {
  message_id: string;
  content: string;
  delivered: boolean;
  read: boolean;
  createdAt: string;
  sender_name: string;
  sender_id: string;
}

const ConversationMessageDisplay = () => {
  const navigate = useNavigate();
  const { convId } = useParams();
  const profile = useRecoilValue(userStore);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessages[] | null>(null);
  const location = useLocation();
  const { state } = location;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [socketError, setSocketError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      const socket = socketService.initializeSocket();
      socketService.subscribeToErrors((errorMessage) => {
        setSocketError(errorMessage || null);
        setIsConnected(!errorMessage);
      });
      if (socket && convId && message.trim()) {
        socket.emit("message", { conversation_id: convId, message });
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state?.url) {
      setMessage(
        `Please give me more information on this product.\n${state?.url}`
      );
    }
  }, [state?.url]);

  useEffect(() => {
    // if (convId) {
    //   socket.emit("joinConversation", convId);

    //   socket.emit("getMessages", convId);

    //   socket.on("allMessages", (data) => {
    //     setMessages(data);
    //   });

    //   const handleNewMessage = (message: IMessages) => {
    //     setMessages((prevMessages) => [...(prevMessages || []), message]);
    //   };

    //   socket.on("authError", (data) => {
    //     console.log({ data });
    //   });

    //   socket.on("newMessage", handleNewMessage);

    //   return () => {
    //     socket.emit("leaveRoom", convId);
    //     socket.off("newMessage", handleNewMessage);
    //   };
    // }

    socketService.subscribeToErrors((errorMessage) => {
      setSocketError(errorMessage || null);
      setIsConnected(!errorMessage);
    });

    // Initialize socket
    const socket = socketService.initializeSocket();

    if (socket && convId) {
      socket.emit("joinConversation", convId);
      socket.emit("getMessages", convId);

      socket.on("allMessages", (data) => {
        setMessages(data);
      });

      const handleNewMessage = (message: IMessages) => {
        setMessages((prevMessages) => [...(prevMessages || []), message]);
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
        socket.off("allMessages");
        socketService.unsubscribeFromErrors(setSocketError);
      };
    }
  }, [convId]);

  const handleManualReconnect = () => {
    socketService.reconnect();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center">
        <TiArrowLeftThick
          className="md:hidden mr-2 text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>

      {/* Messages Container */}
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

        {!messages && (
          <div className="h-full flex items-center justify-center">
            <h1>Loading messages...</h1>
          </div>
        )}

        {messages && messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet. Start a conversation!
          </div>
        )}

        {messages &&
          messages.map((message) => {
            const isSentByMe = message.sender_id === profile?.business_id;
            return (
              <div
                key={message.message_id}
                className={`flex mb-4 ${
                  isSentByMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    isSentByMe
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <div className="font-semibold text-sm">
                    {isSentByMe ? "Me" : message.sender_name}
                  </div>
                  <div className="mb-2 break-words">{message.content}</div>
                  <div className="text-xs opacity-75">
                    {new Date(message.createdAt).toLocaleString()} •{" "}
                    {message.delivered ? "Delivered" : "Sending"} •{" "}
                    {message.read ? "Read" : "Unread"}
                  </div>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageDisplay;
