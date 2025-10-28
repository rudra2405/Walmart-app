import React, { useState, useRef } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/catagory");
        setData(response.data);
      } catch (error) {
        console.log("error occuring", error);
      }
    };
    fetchData();
  }, []);

  const categoryname = useRef("");
  const image = useRef("");
  const productname = useRef("");
  const oldprice = useRef("");
  const newprice = useRef("");
  const addeddate = useRef("");
  const qty = useRef("");
  const descriptions = useRef("");

  const addProductsData = async (e) => {
    e.preventDefault();

    const insert = {
      categoryname: categoryname.current.value,
      image: image.current.value,
      productname: productname.current.value,
      oldprice: oldprice.current.value,
      newprice: newprice.current.value,
      addedate: addeddate.current.value,
      qty: qty.current.value,
      descriptions: descriptions.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8001/products",
        insert
      );
      console.log(response.data);
      Swal.fire({
        title: "Good!",
        text: "Products Added successfully!",
        icon: "success",
      });
    } catch (error) {
      console.log("error occured", error);
    }
    navigate("/admin/manage-products");
  };

  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="p-0 w-full flex flex-row">
        <div className="w-65 bg-black p-10 sticky top-[95px] h-[calc(100vh-95px)] overflow-y-auto">
          <AdminSidebar></AdminSidebar>
        </div>
        <div className="w-full">
          <h1 className="text-3xl ms-5 p-5 mt-2">Add Your Products</h1>
          <hr className="border-1 w-55 ms-15" />

          <form
            onSubmit={addProductsData}
            className="max-w-md mx-5 mt-8 bg-white p-6 rounded shadow"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                Select Category
              </label>
              <select
                id="EmployeeName"
                ref={categoryname}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">select Category</option>
                {data &&
                  data.map((rows) => {
                    return (
                      <>
                        <option value={rows.categoryname}>
                          {rows.categoryname}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                Product Image *
              </label>
              <input
                type="text"
                id="EmployeeName"
                ref={image}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                Product Name
              </label>
              <input
                type="text"
                ref={productname}
                id="EmployeeName"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                Old Price
              </label>
              <input
                type="text"
                ref={oldprice}
                id="EmployeeName"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                New Price
              </label>
              <input
                type="text"
                ref={newprice}
                id="EmployeeName"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                addeddate
              </label>
              <input
                type="date"
                ref={addeddate}
                id="Price"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                Product qty
              </label>
              <input
                type="text"
                ref={qty}
                id="ProductName"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Product description
              </label>
              <textarea
                ref={descriptions}
                id="description"
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Products
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
