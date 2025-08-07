import { useEffect, useState } from "react";
import MainArea from "./main-area";
import { io } from 'socket.io-client';
import type { User } from "../../types/user";
import { fetcher } from "../../lib/fetcher";
import Layout from "./layout";
interface DashboardProps {
    user: User | null | false;
}
const DashboardComponent = ({ user }: DashboardProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);


    const fetchUsers = async () => {
        try {
            const respone = await fetcher('api/user/getAll');
            setUsers(respone.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchUsers();
        const socket = io('http://localhost:4000');

        socket.emit('userJoin', user?.name);

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleUserSelect = (selectedUser: User) => {
        setSelectedUser(selectedUser);
    }

    return (
        <>
            <Layout users={users} onUserSelect={handleUserSelect}>
                <MainArea selectedUser={selectedUser} />
            </Layout>
        </>
    );
};

export default DashboardComponent;
