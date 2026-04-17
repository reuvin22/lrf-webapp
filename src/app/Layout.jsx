import Sidenav from "../components/layout/Sidenav";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidenav />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
