import Sidenav from "../components/layout/Sidenav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex overflow-x-hidden">
      <Sidenav />
      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}