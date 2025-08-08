import { useEffect, useState, useRef } from "react";
// import MainArea from "./main-area";
import { io, Socket } from "socket.io-client";
import type { User } from "../../types/user";
import Layout from "./layout";
import MainArea from "./main-area";

interface DashboardProps {
    user: User | null;
}

interface Message {
    sender: string;
    receiver: string;
    message: string;
}

const DashboardComponent = ({ user }: DashboardProps) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io("http://localhost:4000");
        socketRef.current = socket;
    
        if (user) {
            socket.emit("userJoin", { name: user.name, id: user.id });
        }
    
        socket.on("userJoined", (userInfo: { name: string; id: string }) => {
            if (user?.id !== userInfo.id) {
                alert(`${userInfo.name} has joined the chat!`);
            }
        });
    
        socket.on("newMessage", (message) => {
            console.log("New message received:", message);
            setMessages((prev) => [...prev, message]);
        });
    
        return () => {
            socket.disconnect();
        };
    }, [user]);

    const handleUserSelect = (selectedUser: User) => {
        setSelectedUser(selectedUser);
    };

    const handleSendMessage = (message: string) => {
        if (socketRef.current && user && selectedUser) {
            socketRef.current.emit("userMessage", {
                sender: user.id,
                receiver: selectedUser.id,
                message
            });
        }
    };

    return (
        <Layout onUserSelect={handleUserSelect}>
            <MainArea
                selectedUser={selectedUser}
                onMessageSend={handleSendMessage}
                messages={messages}
                currentUserId={user?.id || ""}
            />
        </Layout>
    );
};

export default DashboardComponent;
