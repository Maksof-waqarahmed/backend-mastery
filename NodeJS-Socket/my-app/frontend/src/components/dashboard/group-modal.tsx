import type { User } from "../../types/user";

interface GroupModalProps {
    setIsModalOpen: () => void; // changed from (isOpen: boolean) => void
    users: User[];
    groupName: string;
    setGroupName: (name: string) => void;
    selectedUsers: string[];
    setSelectedUsers: (users: string[]) => void;
}

const GroupModal = ({
    groupName,
    setGroupName,
    setIsModalOpen,
    users,
    selectedUsers,
    setSelectedUsers,
}: GroupModalProps) => {
    
    const createGroup = () => {
        console.log("Creating group:", groupName, selectedUsers);
        setGroupName("");
        setSelectedUsers([]);
        setIsModalOpen(); // now just toggles
    };

    const toggleUserSelection = (user: string) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white text-black rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Create Group</h2>

                <label className="block mb-2 font-semibold">Group Name</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    placeholder="Enter group name"
                />

                <label className="block mb-2 font-semibold">Add Users</label>
                <div className="h-32 overflow-y-auto mb-4 border p-2 rounded">
                    {users.map((user, i) => (
                        <label key={i} className="flex items-center gap-2 mb-1 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.name)}
                                onChange={() => toggleUserSelection(user.name)}
                            />
                            <span>{user.name}</span>
                        </label>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={setIsModalOpen}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={createGroup}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupModal;
