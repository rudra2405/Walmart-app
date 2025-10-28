import React from "react";

export default function AdminSidebar() {
  return (
    <div className="h-full">
      <img
        src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-corporate-businessman-avatar-tie-associate-picture-image_8289503.png"
        alt="sidebar"
        className="w-16"
      />
      <ul className="sidebar-links">
        <li>
          <a href="/admin">Dashboard</a>
        </li>
        <li>
          <a href="/admin/add-catagory">Add Catagory</a>
        </li>
        <li>
          <a href="/admin/manage-catagory">Manage Catagory</a>
        </li>
        <li>
          <a href="/admin/add-products">Add Products</a>
        </li>
        <li>
          <a href="/admin/manage-products">Manage Products</a>
        </li>
        <li>
          <a href="/admin-login/manage-contact">Manage Contact</a>
        </li>
        <li>
          <a href="/admin-login/manage-orders">Manage Orders</a>
        </li>
        <li>
          <a href="/admin-login/logout" className="bg-red-400 p-2 w-full">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
