import Sidenav from "../components/layout/Sidenav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidenav />
      <div className="flex-1 min-w-0 overflow-y-auto bg-gray-100">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}