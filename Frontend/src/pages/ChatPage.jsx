// pages/ChatPage.jsx

console.log("ChatPage.jsx loaded"); 

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocket } from "@/context/socketContext";
import { useAuth } from "@/context/authContext";

const API = "http://localhost:8021/api/v1/chat";

const ChatPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const { user } = useAuth(); // adapt if your authContext exposes the user differently

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  // Load conversation list
  useEffect(() => {
    axios
      .get(`${API}/conversations`, { withCredentials: true })
      .then((res) => setConversations(res.data.conversations))
      .catch(console.error);
  }, []);

  // Load messages + join socket room when conversation changes
  useEffect(() => {
    if (!conversationId) return;

    axios
      .get(`${API}/conversations/${conversationId}/messages`, { withCredentials: true })
      .then((res) => setMessages(res.data.messages))
      .catch(console.error);

    socket?.emit("joinConversation", conversationId);
    return () => socket?.emit("leaveConversation", conversationId);
  }, [conversationId, socket]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;
    const handler = (message) => {
      if (message.conversation === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    };
    socket.on("newMessage", handler);
    return () => socket.off("newMessage", handler);
  }, [socket, conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    try {
      await axios.post(
        `${API}/conversations/${conversationId}/messages`,
        { text: draft },
        { withCredentials: true }
      );
      setDraft("");
    } catch (err) {
      console.error(err);
    }
  };

  const activeConversation = conversations.find((c) => c._id === conversationId);
  const otherParticipant = activeConversation?.participants.find(
    (p) => p._id !== user?._id
  );

  return (
    <div className="min-h-[calc(100vh-13rem)] bg-[#FAF8F3] flex">
      {/* Conversation list */}
      <div className="w-80 border-r border-[#1B1F1D]/8 bg-white hidden md:flex flex-col">
        <div className="px-5 py-4 border-b border-[#1B1F1D]/8">
          <h2 className="font-semibold text-[#14201B]">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => {
            const other = c.participants.find((p) => p._id !== user?._id);
            const isActive = c._id === conversationId;
            return (
              <button
                key={c._id}
                onClick={() => navigate(`/chat/${c._id}`)}
                className={`w-full text-left px-5 py-3.5 border-b border-[#1B1F1D]/5 transition-colors ${
                  isActive ? "bg-[#1F6B4C]/8" : "hover:bg-[#FAF8F3]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1F6B4C] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    {other?.fullname?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#14201B] truncate">
                      {other?.fullname || "Unknown"}
                    </p>
                    <p className="text-xs text-[#14201B]/50 truncate">
                      {c.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active conversation */}
      <div className="flex-1 flex flex-col">
        {!conversationId ? (
          <div className="flex-1 flex items-center justify-center text-[#14201B]/40 text-sm">
            Select a conversation to start chatting
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-[#1B1F1D]/8 bg-white">
              <p className="font-semibold text-[#14201B]">
                {otherParticipant?.fullname || "Conversation"}
              </p>
              {activeConversation?.job?.title && (
                <p className="text-xs text-[#14201B]/50">Re: {activeConversation.job.title}</p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
              {messages.map((m) => {
                const isMine = m.sender._id === user?._id;
                return (
                  <div key={m._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                        isMine
                          ? "bg-[#1F6B4C] text-white rounded-br-sm"
                          : "bg-white border border-[#1B1F1D]/8 text-[#14201B] rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} className="px-6 py-4 border-t border-[#1B1F1D]/8 bg-white flex gap-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 px-4 py-2.5 border border-[#1B1F1D]/15 rounded-full bg-[#FAF8F3] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30"
              />
              <button
                type="submit"
                className="bg-[#1F6B4C] hover:bg-[#18543B] text-white font-semibold text-sm rounded-full px-5 py-2.5 transition-colors"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;