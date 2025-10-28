import React, { useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ManageProducts() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="p-0 w-full flex flex-row">
        <div className="w-65 bg-black p-10 sticky top-[95px] h-[calc(100vh-95px)] overflow-y-auto">
          <AdminSidebar></AdminSidebar>
        </div>
        <div className="w-full">
          <h1 className="text-3xl ms-5 p-5 mt-5">Manage Products</h1>
          <hr className="border-1 w-55 ms-15" />
          <div className="overflow-x-auto mx-3 mt-8">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Old price</th>
                  <th className="py-2 px-4 border-b">New Price</th>
                  <th className="py-2 px-4 border-b">Added date</th>
                  <th className="py-2 px-4 border-b">Qty</th>
                  <th className="py-2 px-4 border-b">Descriptions</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((items, index) => {
                    return (
                      <tr className="hover:bg-gray-100 text-center overflow-auto">
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">
                          <img
                            src={items.image}
                            alt="photo"
                            style={{ width: "85px", height: "85px" }}
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          {items.productname}
                        </td>
                        <td className="py-2 px-4 border-b">{items.oldprice}</td>
                        <td className="py-2 px-4 border-b">{items.newprice}</td>
                        <td className="py-2 px-4 border-b">{items.addedate}</td>
                        <td className="py-2 px-4 border-b">{items.qty}</td>
                        <td className="py-2 px-4 border-b overflow-auto w-50 h-50">
                          <div className="w-40 h-40 overflow-auto text-justify">
                            {items.descriptions}
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              navigate(`/delete-product/${items.id}`);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => {
                              navigate(`/update-product/${items.id}`);
                            }}
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
