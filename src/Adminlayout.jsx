import React from "react";
import AdminHeader from "./Components/Admin/AdminHeader";
import AdminSidebar from "./Components/Admin/AdminSidebar";
import Dashboard from "./Components/Admin/Dashboard";

export default function Adminlayout() {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="p-0 w-full flex flex-row">
        <div className="w-65 bg-black p-10 sticky top-[95px] h-[calc(100vh-95px)] overflow-y-auto">
          <AdminSidebar></AdminSidebar>
        </div>
        <div className="w-full">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
