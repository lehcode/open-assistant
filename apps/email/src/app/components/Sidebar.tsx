import { LayoutGrid, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-64 bg-white shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <LayoutGrid className="h-5 w-5 text-gray-500" />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <Settings className="h-5 w-5 text-gray-500" />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </aside>
    </div>
  );
};

export default Sidebar;
