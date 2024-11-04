// // import socketService from "@/service/socketmessaging";
// // import ConversationCard, { IConversation } from "./ConversationCard";

// // import { useEffect, useState } from "react";
// // import { Alert, AlertDescription } from "../ui/alert";

// // const ConversationDisplay = () => {
// //   const [conversations, setConversations] = useState<IConversation[] | null>(null);
// //   const [socketError, setSocketError] = useState<string | null>(null);
// //   const [isConnected, setIsConnected] = useState(false);

// //   useEffect(() => {

// //     socketService.subscribeToErrors((errorMessage) => {
// //       setSocketError(errorMessage || null);
// //       setIsConnected(!errorMessage);
// //     });

// //     const socket = socketService.initializeSocket()
// //     if(socket) {

// //       socket.on("connect_error", (err) => {
// //         console.error("Connection Error:", err.message);
// //       });

// //       socket.emit("getConversations");

// //       socket.on("conversations", (d) => {
// //         console.log(d)
// //         setConversations(d);
// //         //I want to join the individual conversations here so that I can get the read the getConversation message and update that conversation
// //       });

// //       socket.on('newConversationMessage', (conversations: IConversation)=> {
// //         //replace the conversation with the one having that id.
// //       })

// //       socket.on('userTyping', (business_id: string)=> {
// //         //I need a way to get which conversation this typing is from
// //         //I also need to set that conversation to show typing.
// //       })

// //       socket.on('userStoppedTyping', (business_id: string)=> {
// //         //I need a way to get which conversation this typing is from
// //         //I also need to set that conversation to show typing.
// //       })

// //       return () => {
// //         socket.off("conversations");
// //       };
// //     }
// //   }, []);

// //   const handleManualReconnect = () => {
// //     socketService.reconnect();
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       <div className="p-4 border-b">
// //         <h2 className="text-lg font-semibold">My Messages</h2>
// //       </div>

// //       <div className="flex-1 overflow-y-auto p-4">
// //       {socketError && (
// //         <Alert variant="destructive" className="mb-4">
// //           <AlertDescription>
// //             {socketError}
// //             {!isConnected && (
// //               <button
// //                 onClick={handleManualReconnect}
// //                 className="ml-2 underline"
// //               >
// //                 Try reconnecting now
// //               </button>
// //             )}
// //           </AlertDescription>
// //         </Alert>
// //       )}
// //         {!conversations && (
// //           <div className="flex items-center justify-center h-full">
// //             <div>Loading conversations...</div>
// //           </div>
// //         )}

// //         {conversations && conversations.length === 0 && (
// //           <div className="flex items-center justify-center h-full text-gray-500">
// //             No conversations yet
// //           </div>
// //         )}

// //         {conversations && (
// //           <div className="flex flex-col gap-2">
// //             {conversations.map((c) => (
// //               <ConversationCard key={c.id} {...c} />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ConversationDisplay;
// import socketService from "@/service/socketmessaging";
// import ConversationCard, { IConversation } from "./ConversationCard";
// import { useEffect, useState } from "react";
// import { Alert, AlertDescription } from "../ui/alert";

// const ConversationDisplay = () => {
//   const [conversations, setConversations] = useState<IConversation[] | null>(
//     null
//   );
//   const [socketError, setSocketError] = useState<string | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     socketService.subscribeToErrors((errorMessage) => {
//       setSocketError(errorMessage || null);
//       setIsConnected(!errorMessage);
//     });

//     const socket = socketService.initializeSocket();
//     if (socket) {
//       socket.on("connect_error", (err) => {
//         console.error("Connection Error:", err.message);
//       });

//       // Fetch initial conversations and join each room
//       socket.emit("getConversations");

//       socket.on("conversations", (data: IConversation[]) => {
//         setConversations(data);

//         // Join each conversation room to receive updates
//         data.forEach((conversation) => {
//           socket.emit("joinConversation", conversation.id);
//         });
//       });

//       socket.on(
//         "newConversationMessage",
//         (updatedConversation: IConversation) => {
//           setConversations((prevConversations) => {
//             if (!prevConversations) return null;
//             return prevConversations.map((c) =>
//               c.id === updatedConversation.id ? updatedConversation : c
//             );
//           });
//         }
//       );

//       socket.on(
//         "userTyping",
//         (data: { business_id: string; conversation_id: string }) => {
//           setConversations((prev) => {
//             if (!prev) return null;
//             return prev.map((conv) => {
//               if (conv.id !== data.conversation_id) {
//                 return conv;
//               }
//               return { ...conv, isTyping: true };
//             });
//           });
//         }
//       );

//       // Hide typing indicator for specific conversation
//       socket.on(
//         "userStoppedTyping",
//         (data: { business_id: string; conversation_id: string }) => {
//           setConversations((prev) => {
//             if (!prev) return null;
//             return prev.map((conv) => {
//               if (conv.id !== data.conversation_id) {
//                 return conv;
//               }
//               return { ...conv, isTyping: false };
//             });
//           });
//         }
//       );

//       // Clean up socket listeners on unmount
//       return () => {
//         socket.off("conversations");
//         socket.off("newConversationMessage");
//         socket.off("userTyping");
//         socket.off("userStoppedTyping");
//       };
//     }
//   }, []);

//   const handleManualReconnect = () => {
//     socketService.reconnect();
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-semibold">My Messages</h2>
//       </div>

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

//         {!conversations && (
//           <div className="flex items-center justify-center h-full">
//             <div>Loading conversations...</div>
//           </div>
//         )}

//         {conversations && conversations.length === 0 && (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             No conversations yet
//           </div>
//         )}

//         {conversations && (
//           <div className="flex flex-col gap-2">
//             {conversations.map((c) => (
//               <ConversationCard key={c.id} {...c} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConversationDisplay;
import socketService from "@/service/socketmessaging";
import ConversationCard, { IConversation } from "./ConversationCard";
import { useEffect, useState, useCallback } from "react";
import { Alert, AlertDescription } from "../ui/alert";

interface TypingIndicatorData {
  business_id: string;
  conversation_id: string;
  business_name: string; // Added to match the server response
}

const ConversationDisplay = () => {
  const [conversations, setConversations] = useState<IConversation[] | null>(
    null
  );
  const [socketError, setSocketError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Memoize conversation update handlers

  const handleTypingIndicator = useCallback(
    (data: TypingIndicatorData, isTyping: boolean) => {
      setConversations((prev) => {
        if (!prev) return null;
        return prev.map((conv) => {
          if (conv.id !== data.conversation_id) return conv;
          return {
            ...conv,
            isTyping,
            typingUser: isTyping ? data.business_name : undefined,
          };
        });
      });
    },
    []
  );

  useEffect(() => {
    socketService.subscribeToErrors((errorMessage) => {
      setSocketError(errorMessage || null);
      setIsConnected(!errorMessage);
    });

    const socket = socketService.initializeSocket();
    if (!socket) return;

    // Error handling
    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
      setSocketError(`Connection error: ${err.message}`);
      setIsConnected(false);
    });

    socket.on("connect", () => {
      setIsConnected(true);
      setSocketError(null);
      // Re-fetch conversations on reconnect
      socket.emit("getConversations");
    });

    // Conversation handlers
    socket.on("conversations", (data: IConversation[]) => {
      // Sort conversations by latest message
      const sortedConversations = [...data].sort(
        (a, b) =>
          new Date(b.message_sent_at).getTime() -
          new Date(a.message_sent_at).getTime()
      );
      setConversations(sortedConversations);

      // Join each conversation room
      sortedConversations.forEach((conversation) => {
        socket.emit("joinConversation", conversation.id);
      });
    });

    socket.on(
      "newConversationMessage",
      (updatedConversation: IConversation) => {
        console.log(updatedConversation)
        setConversations((prevConversations) => {
          if (!prevConversations) return null;
          return prevConversations
            .map((conv) =>
              conv.id === updatedConversation.id ? updatedConversation : conv
            )
            .sort(
              (a, b) =>
                new Date(b.message_sent_at).getTime() -
                new Date(a.message_sent_at).getTime()
            );
        });
      }
    );
    socket.on("userTyping", (data: TypingIndicatorData) =>
      handleTypingIndicator(data, true)
    );
    socket.on("userStoppedTyping", (data: TypingIndicatorData) =>
      handleTypingIndicator(data, false)
    );

    // Initial fetch
    socket.emit("getConversations");

    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("conversations");
      socket.off("newConversationMessage");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
      // Optionally leave rooms here if needed
      conversations?.forEach((conv) => {
        socket.emit("leaveConversation", conv.id);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array since handlers are memoized

  const handleManualReconnect = () => {
    socketService.reconnect();
  };

  const markAsOpened = (id: string) => {
    setConversations((prev) => {
      if (!prev) return null;
      return prev.map((conv) => {
        if (conv.id !== id) return conv;
        return { ...conv, unread_count: "0" };
      });
    });
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

        {conversations?.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            No conversations yet
          </div>
        )}

        {conversations && conversations.length > 0 && (
          <div className="flex flex-col gap-2">
            {conversations.map((conversation) => (
              <ConversationCard
                reader={markAsOpened}
                key={conversation.id}
                data={conversation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationDisplay;
