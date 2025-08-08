import { prisma } from "../lib/db";

interface MessageData {
  sender: string;
  receiver?: string;
  groupId?: string;
  message: string;
}

export const saveMessage = async (data: MessageData) => {
  try {
    const message = await prisma.message.create({
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
      }
    });
    console.log("Message", message);
    return message;
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message");
  }
};
