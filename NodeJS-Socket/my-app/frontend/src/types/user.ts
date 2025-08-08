export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: string;
}

export interface Message {
    sender: string;
    receiver?: string;
    groupId?: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}
