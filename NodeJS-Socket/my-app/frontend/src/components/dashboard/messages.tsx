export const IncomingMessage = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3">
        <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
        />
        <div className="bg-white p-3 rounded-xl shadow text-gray-800 max-w-xs">
            {text}
        </div>
    </div>
);

export const OutgoingMessage = ({ text }: { text: string }) => (
    <div className="flex items-end gap-3 justify-end">
        <div className="bg-blue-100 p-3 rounded-xl shadow text-gray-800 max-w-xs">
            {text}
        </div>
        <img
            src="https://via.placeholder.com/40"
            alt="Me"
            className="w-10 h-10 rounded-full object-cover"
        />
    </div>
);
