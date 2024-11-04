// import moment from "moment";
// import { Card } from "../ui/card";
// import { useNavigate } from "react-router-dom";

// export interface IConversation {
//   id: string;
//   conversation_name: string;
//   latest_message: string;
//   message_sent_at: string;
//   unread_count: string;
//   isTyping: boolean;
// }

// const ConversationCard = ({
//   conversation_name,
//   latest_message,
//   message_sent_at,
//   id,
//   unread_count,
//   isTyping,
// }: IConversation) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="p-2 cursor-pointer" onClick={() => navigate(`${id}`)}>
//       <div className="flex items-center justify-between w-full">
//         <h3 className="flex-1">{conversation_name}</h3>

//         <span className="text-xs text-gray-500">
//           {message_sent_at && moment(message_sent_at).fromNow()}
//         </span>
//       </div>

//       <p className="mt-2">
//         {isTyping ? (
//           <span className="text-blue-500">Typing...</span> // Show typing indicator
//         ) : (
//           latest_message || "No messages yet"
//         )}
//       </p>

//       {/* Display unread count if greater than zero */}
//       {parseInt(unread_count) > 0 && (
//         <span className="text-xs font-semibold text-blue-500 mt-1">
//           {unread_count} unread
//         </span>
//       )}
//     </Card>
//   );
// };

// export default ConversationCard;
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface IConversation {
  id: string;
  conversation_name: string;
  latest_message: string;
  message_sent_at: string;
  unread_count: string;
  isTyping: boolean;
}

const ConversationCard = ({
  conversation_name,
  latest_message,
  message_sent_at,
  id,
  unread_count,
  isTyping,
}: IConversation) => {
  // Format the timestamp
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const navigate = useNavigate();

  return (
    <Card
      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => navigate(`${id}`)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium text-base truncate">
              {conversation_name}
            </h3>
            <span className="text-sm text-gray-500 flex-shrink-0">
              {formatTimestamp(message_sent_at)}
            </span>
          </div>

          <div className="text-sm text-gray-600 truncate">
            {isTyping ? (
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                Typing...
              </span>
            ) : (
              latest_message || "No messages yet"
            )}
          </div>
        </div>

        {parseInt(unread_count) > 0 && (
          <div className="flex-shrink-0 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {unread_count}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ConversationCard;
