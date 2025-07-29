import { useEffect } from "react";
import MainArea from "./main-area";
import SideBar from "./side-bar";
import { io } from 'socket.io-client';

const Dashboard = () => {
    useEffect(() => {
        const socket = io('http://localhost:4000');
        const userName = "Waqar Ahmed";

        socket.emit('userJoin', userName);

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

export default Dashboard;
