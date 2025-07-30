import { useState } from "react";
import GroupModal from "./group-modal";

const users = ["Waqar", "Ali", "Fatima", "John", "Zara"];

const SideBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);



    function handleGroupNameChange(value: string) {
        console.log("Value from modal:", value);
        setGroupName(value);
    }

    function handleSelectedUsersChange(users: string[]) {
        console.log("Selected users from modal:", users);
        setSelectedUsers(users);
    }

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }
    return (
        <aside className="w-80 h-screen bg-gray-900 text-white p-4 shadow-lg flex flex-col">
            <div className="bg-white rounded-2xl overflow-hidden flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white text-black p-4 border-b">
                    <h1 className="text-2xl font-bold text-center mb-4">Rana's Chats</h1>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full px-3 py-2 rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-3">
                    {users.map((name, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 bg-white rounded-lg p-3 shadow hover:bg-gray-200 transition-all cursor-pointer"
                        >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-semibold text-gray-800">{name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fixed Create Group Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
            >
                ➕ Create Group
            </button>

            {/* Modal */}
            {isModalOpen && (
                <GroupModal
                    setGroupName={handleGroupNameChange}
                    setSelectedUsers={handleSelectedUsersChange}
                    selectedUsers={selectedUsers}
                    users={users}
                    groupName={groupName}
                    setIsModalOpen={toggleModal}
                />
            )}
        </aside>
    );
};

export default SideBar;
