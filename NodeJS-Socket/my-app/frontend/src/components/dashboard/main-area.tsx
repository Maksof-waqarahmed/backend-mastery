import { useState } from "react";
import type { Message, User } from "../../types/user";
import { IncomingMessage, OutgoingMessage } from "./messages";

interface MainAreaProps {
  selectedUser: User | null;
  currentUserId: string; // ✅ Current logged-in user ka ID
  onMessageSend: (message: string) => void;
  messages: Message[];
}

const MainArea = ({
  selectedUser,
  currentUserId,
  onMessageSend,
  messages,
}: MainAreaProps) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onMessageSend(message);
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="flex-1 h-screen p-4 bg-gray-100 overflow-hidden">
      <div className="bg-white h-full rounded-2xl shadow-md flex flex-col">
        {!selectedUser ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Select a user to start chatting
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="w-full h-16 flex items-center gap-3 bg-gray-200 rounded-t-2xl px-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-800 text-lg">
                {selectedUser.name}
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((msg, index) =>
                msg.sender === currentUserId ? (
                  <OutgoingMessage key={index} text={msg.message} />
                ) : (
                  <IncomingMessage key={index} text={msg.message} />
                )
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="p-4 border-t bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={message}
                  onChange={handleMessageChange}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MainArea;
