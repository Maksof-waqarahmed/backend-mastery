import type { User } from "../../types/user";
import SideBar from "./side-bar";

interface LayoutProps {
  onUserSelect: (user: User) => void;
  children: React.ReactNode;
}

const Layout = ({onUserSelect, children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar onUserSelect={onUserSelect} />
      {children}
    </div>
  );
};

export default Layout;
