import type { User } from "../../types/user";
import SideBar from "./side-bar";

interface LayoutProps {
  users: User[];
  onUserSelect: (user: User) => void;
  children: React.ReactNode;
}

const Layout = ({ users, onUserSelect, children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar users={users} onUserSelect={onUserSelect} />
      {children}
    </div>
  );
};

export default Layout;
