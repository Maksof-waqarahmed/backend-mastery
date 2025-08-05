import { useEffect } from "react";
import MainArea from "./main-area";
import SideBar from "./side-bar";
import { io } from 'socket.io-client';
import type { User } from "../../types/user";
import { fetcher } from "../../lib/fetcher";
interface DashboardProps {
    user: User | null | false;
}
const DashboardComponent = ({ user }: DashboardProps) => {

    let users = [];
    const fetchUsers = async () => {
        try {
            users = await fetcher('api/user/getAll');
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


    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <SideBar />
            <MainArea />
        </div>
    );
};

export default DashboardComponent;
