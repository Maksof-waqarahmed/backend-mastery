import { prisma } from "../lib/db";

interface MessageData {
    sender: string;
    receiver?: string;
    groupId?: string;
    message: string;
  }
  
  export const saveMessage = async (data: MessageData) => {
    console.log("Data", data)
    try {
      if (!data.sender) {
        throw new Error("senderId is required");
      }
  
      const newMessage = await prisma.message.create({
        data: {
          sender: {
            connect: { id: data.sender },
          },
          receiver: data.receiver
            ? { connect: { id: data.receiver } }
            : undefined,
          group: data.groupId
            ? { connect: { id: data.groupId } }
            : undefined,
          content: data.message,
        },
      });
  
      console.log("Message saved:", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      throw new Error("Failed to save message");
    }
  };
  