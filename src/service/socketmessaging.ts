// import { io } from "socket.io-client";

// const token = localStorage.getItem("token");

// const socket = io("https://api.omniglobex.com", {
//   auth: {
//     token,
//   },
//   autoConnect: true,
//   reconnectionAttempts: 3,
//   path: "/api/message",
//   transports: ["websocket", "polling"],
//   timeout: 10000,
// });

// socket.on("connect_error", (error) => {
//   console.error("Connection error:", error);
// });

// socket.on("error", (error) => {
//   console.error("Socket error:", error);
// });

// export default socket;
import { io, Socket } from "socket.io-client";

type ErrorCallback = (message: string) => void;

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private connectionAttempts = 0;
  private maxAttempts = 5;
  private errorCallbacks: Set<ErrorCallback> = new Set();

  private constructor() {
    // Private constructor to prevent direct construction calls with the `new` operator
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public subscribeToErrors(callback: ErrorCallback) {
    this.errorCallbacks.add(callback);
  }

  public unsubscribeFromErrors(callback: ErrorCallback) {
    this.errorCallbacks.delete(callback);
  }

  private notifyError(message: string) {
    this.errorCallbacks.forEach((callback) => callback(message));
  }

  public initializeSocket(): Socket | null {
    const token = localStorage.getItem("token");

    if (!token) {
      this.notifyError("No authentication token found");
      return null;
    }

    // If socket exists and is connected, return it
    if (this.socket?.connected) {
      return this.socket;
    }

    // If socket exists but isn't connected, clean it up
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io("https://api.omniglobex.com", {
      auth: { token },
      autoConnect: true,
      reconnectionAttempts: 3,
      path: "/api/message",
      transports: ["websocket", "polling"],
      timeout: 10000,
    });

    this.setupEventListeners();
    return this.socket;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Socket connected successfully");
      this.connectionAttempts = 0;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      this.notifyError(""); // Clear any error messages
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.notifyError(`Connection error: ${error.message}`);
      this.handleReconnect();
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
      this.notifyError(`Socket error: ${error.message}`);
      this.handleReconnect();
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      this.notifyError(`Disconnected: ${reason}`);
      this.handleReconnect();
    });
  }

  private handleReconnect() {
    this.connectionAttempts++;

    if (this.connectionAttempts <= this.maxAttempts) {
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
      }

      this.notifyError(
        `Attempting to reconnect in 30 seconds... (Attempt ${this.connectionAttempts}/${this.maxAttempts})`
      );

      this.reconnectTimer = setTimeout(() => {
        this.notifyError("Attempting to reconnect...");
        this.initializeSocket();
      }, 30000);
    } else {
      this.notifyError(
        "Maximum reconnection attempts reached. Please refresh the page or try again later."
      );
    }
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.connectionAttempts = 0;
  }

  public reconnect() {
    this.connectionAttempts = 0;
    this.disconnect();
    return this.initializeSocket();
  }
}

// Create and export the singleton instance
const socketService = SocketService.getInstance();

export default socketService;
