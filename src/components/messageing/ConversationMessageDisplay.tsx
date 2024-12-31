// import { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { TiArrowLeftThick } from "react-icons/ti";
// import { userStore } from "@/store/user-store";
// import { Input } from "../ui/input";
// import { Alert, AlertDescription } from "../ui/alert";
// import socketService from "@/service/socketmessaging";

// interface IMessages {
//   message_id: string;
//   content: string;
//   delivered: boolean;
//   read: boolean;
//   createdAt: string;
//   sender_name: string;
//   sender_id: string;
// }

// const ConversationMessageDisplay = () => {
//   const navigate = useNavigate();
//   const { convId } = useParams();
//   const profile = useRecoilValue(userStore);
//   const [message, setMessage] = useState<string>("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [messages, setMessages] = useState<IMessages[] | null>(null);
//   const location = useLocation();
//   const { state } = location;
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const [socketError, setSocketError] = useState<string | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     try {
//       const socket = socketService.initializeSocket();
//       socketService.subscribeToErrors((errorMessage) => {
//         setSocketError(errorMessage || null);
//         setIsConnected(!errorMessage);
//       });
//       if (socket && convId && message.trim()) {
//         socket.emit("message", { conversation_id: convId, message });
//         setMessage("");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Emit typing indicator events with debounce
//   useEffect(() => {
//     const socket = socketService.initializeSocket();
//     if (!socket || !convId) return;

//     if (message && !isTyping) {
//       // Emit typing indicator if user starts typing
//       socket.emit("typingIndicator", { conversation_id: convId, business_id: profile?.business_id });
//       setIsTyping(true);
//     }

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     // Set a timeout to emit stopped typing indicator after a debounce
//     typingTimeoutRef.current = setTimeout(() => {
//       if (isTyping) {
//         socket.emit("stoppedIndicator", { conversation_id: convId, business_id: profile?.business_id });
//         setIsTyping(false);
//       }
//     }, 1000); // 1000ms debounce time

//     // Clean up timeout on component unmount or message change
//     return () => {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, [message, convId, isTyping, profile?.business_id]);

//   useEffect(() => {
//     if (state?.url) {
//       setMessage(
//         `Please give me more information on this product.\n${state?.url}`
//       );
//     }
//   }, [state?.url]);

//   useEffect(() => {
//     socketService.subscribeToErrors((errorMessage) => {
//       setSocketError(errorMessage || null);
//       setIsConnected(!errorMessage);
//     });

//     // Initialize socket
//     const socket = socketService.initializeSocket();

//     if (socket && convId) {
//       socket.emit("joinConversation", convId);
//       socket.emit("getMessages", convId);

//       socket.on("allMessages", (data) => {
//         setMessages(data);
//       });

//       const handleNewMessage = (message: IMessages) => {
//         setMessages((prevMessages) => [...(prevMessages || []), message]);
//       };

//       socket.on("newMessage", handleNewMessage);

//       return () => {
//         socket.off("newMessage", handleNewMessage);
//         socket.off("allMessages");
//         socketService.unsubscribeFromErrors(setSocketError);
//       };
//     }
//   }, [convId]);

//   const handleManualReconnect = () => {
//     socketService.reconnect();
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="p-4 border-b flex items-center">
//         <TiArrowLeftThick
//           className="md:hidden mr-2 text-2xl cursor-pointer"
//           onClick={() => navigate(-1)}
//         />
//         <h2 className="text-lg font-semibold">Messages</h2>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {socketError && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertDescription>
//               {socketError}
//               {!isConnected && (
//                 <button
//                   onClick={handleManualReconnect}
//                   className="ml-2 underline"
//                 >
//                   Try reconnecting now
//                 </button>
//               )}
//             </AlertDescription>
//           </Alert>
//         )}

//         {!messages && (
//           <div className="h-full flex items-center justify-center">
//             <h1>Loading messages...</h1>
//           </div>
//         )}

//         {messages && messages.length === 0 && (
//           <div className="h-full flex items-center justify-center text-gray-500">
//             No messages yet. Start a conversation!
//           </div>
//         )}

//         {messages &&
//           messages.map((message) => {
//             const isSentByMe = message.sender_id === profile?.business_id;
//             return (
//               <div
//                 key={message.message_id}
//                 className={`flex mb-4 ${
//                   isSentByMe ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`p-3 rounded-lg max-w-[80%] ${
//                     isSentByMe
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   <div className="font-semibold text-sm">
//                     {isSentByMe ? "Me" : message.sender_name}
//                   </div>
//                   <div className="mb-2 break-words">{message.content}</div>
//                   {isSentByMe && (
//                     <div className="text-xs opacity-75">
//                       {new Date(message.createdAt).toLocaleString()} •{" "}
//                       {message.delivered ? "Delivered" : "Sent"} •{" "}
//                       {message.read ? "Read" : "Unread"}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="border-t bg-white p-4">
//         <div className="flex gap-2">
//           <Input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//             placeholder="Type a message..."
//             className="flex-1"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationMessageDisplay;
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TiArrowLeftThick } from "react-icons/ti";
import { userStore } from "@/store/user-store";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import socketService from "@/service/socketmessaging";
import { Textarea } from "../ui/textarea";

interface IMessages {
  message_id: string;
  content: string;
  delivered: boolean;
  read: boolean;
  createdAt: string;
  sender_name: string;
  sender_id: string;
}

interface ChatState {
  messages: IMessages[] | null;
  isConnected: boolean;
  socketError: string | null;
  isTyping: boolean;
}

const TYPING_DEBOUNCE_TIME = 1000;

const ConversationMessageDisplay = () => {
  const navigate = useNavigate();
  const { convId } = useParams();
  const profile = useRecoilValue(userStore);
  const location = useLocation();
  const { state } = location;

  const [chatState, setChatState] = useState<ChatState>({
    messages: null,
    isConnected: false,
    socketError: null,
    isTyping: false,
  });

  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle initial URL state
  useEffect(() => {
    if (state?.url) {
      setMessage(
        `Please give me more information on this product.\n${state.url}`
      );
    }
  }, [state?.url]);

  // Socket connection and message handling
  useEffect(() => {
    const socket = socketService.initializeSocket();

    if (!socket || !convId) return;

    const handleNewMessage = (message: IMessages) => {
      setChatState((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), message],
      }));
      scrollToBottom();
    };

    const handleSocketError = (errorMessage: string | null) => {
      setChatState((prev) => ({
        ...prev,
        socketError: errorMessage,
        isConnected: !errorMessage,
      }));
    };

    socket.emit("joinConversation", convId);
    socket.emit("getMessages", convId);

    socket.on("allMessages", (data) => {
      setChatState((prev) => ({
        ...prev,
        messages: data,
      }));
      scrollToBottom();
    });

    socket.on("newMessage", handleNewMessage);
    socketService.subscribeToErrors(handleSocketError);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("allMessages");
      socketService.unsubscribeFromErrors(handleSocketError);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [convId, scrollToBottom]);

  // Typing indicator handler
  useEffect(() => {
    const socket = socketService.initializeSocket();
    if (!socket || !convId || !profile?.business_id) return;

    const handleTypingStart = () => {
      if (!chatState.isTyping) {
        socket.emit("typingIndicator", {
          conversation_id: convId,
          business_id: profile.business_id,
        });
        setChatState((prev) => ({ ...prev, isTyping: true }));
      }
    };

    const handleTypingStop = () => {
      socket.emit("stoppedIndicator", {
        conversation_id: convId,
        business_id: profile.business_id,
      });
      setChatState((prev) => ({ ...prev, isTyping: false }));
    };

    if (message) {
      handleTypingStart();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(
        handleTypingStop,
        TYPING_DEBOUNCE_TIME
      );
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [message, convId, profile?.business_id, chatState.isTyping]);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const socket = socketService.initializeSocket();
    if (!socket || !convId) return;

    try {
      socket.emit("message", { conversation_id: convId, message });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [message, convId]);

  const MessageBubble = ({
    message,
    isSentByMe,
  }: {
    message: IMessages;
    isSentByMe: boolean;
  }) => (
    <div
      className={`flex mb-4 ${isSentByMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-3 rounded-lg max-w-[80%] ${
          isSentByMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <div className="font-semibold text-sm">
          {isSentByMe ? "Me" : message.sender_name}
        </div>
        <div className="mb-2 break-words whitespace-pre-wrap">
          {message.content}
        </div>
        {isSentByMe && (
          <div className="text-xs opacity-75">
            {new Date(message.createdAt).toLocaleString()} •{" "}
            {message.delivered ? "Delivered" : "Sent"} •{" "}
            {message.read ? "Read" : "Unread"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center">
        <TiArrowLeftThick
          className="md:hidden mr-2 text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {chatState.socketError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {chatState.socketError}
              {!chatState.isConnected && (
                <button
                  onClick={() => socketService.reconnect()}
                  className="ml-2 underline"
                >
                  Try reconnecting now
                </button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {!chatState.messages && (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Loading messages...</span>
          </div>
        )}

        {chatState.messages?.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet. Start a conversation!
          </div>
        )}

        {chatState.messages?.map((msg) => (
          <MessageBubble
            key={msg.message_id}
            message={msg}
            isSentByMe={msg.sender_id === profile?.business_id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageDisplay;
