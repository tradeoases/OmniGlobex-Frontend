// import { io } from "socket.io-client";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "https://api.omniglobex.com";

// const token = localStorage.getItem("token");
// export const makeMessageSocket = () => {
//   const socket = io(API_BASE_URL, {
//     auth: {
//       token,
//     },
//     autoConnect: true,
//     reconnectionAttempts: 3,
//     path: "/api/message",
//     transports: ["websocket"], // Use "websocket" transport
//   });
  
//   return socket;
// };

// const socket = io(API_BASE_URL, {
//   auth: {
//     token,
//   },
//   autoConnect: true,
//   reconnectionAttempts: 3,
//   path: "/api/message",
//   transports: ["websocket"], // Use "websocket" transport
// });

// // export makeMessageSocket
// export default socket;
import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io("https://api.omniglobex.com", {
  auth: {
    token,
  },
  autoConnect: true,
  reconnectionAttempts: 3,
  path: "/api/message",
  transports: ["websocket", "polling"],
  timeout: 10000,
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

export default socket;