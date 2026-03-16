// import ChatPage from "../components/ChatPage";

// export default ChatPage;


"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import ChatPage from "../components/ChatPage";

export default function Chat() {
  return (
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  );
}