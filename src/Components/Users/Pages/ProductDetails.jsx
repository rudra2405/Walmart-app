import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import Swal from "sweetalert2";
import { FaCartPlus, FaShopify } from "react-icons/fa";

export default function ProductDetails() {
  const [data, setData] = useState("");
  const categoryname = useRef("");
  const image = useRef("");
  const productname = useRef("");
  const oldprice = useRef("");
  const newprice = useRef("");
  const addedate = useRef("");
  const qty = useRef("");
  const descriptions = useRef("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8001/products/${id}`).then((response) => {
      setData(response.data);
      categoryname.current.value = response.data.categoryname;
      image.current.src = response.data.image;
      productname.current.value = response.data.productname;
      oldprice.current.value = response.data.oldprice;
      newprice.current.value = response.data.newprice;
      addedate.current.value = response.data.addedate;
      qty.current.value = response.data.qty;
      descriptions.current.value = response.data.descriptions;
    });
  }, [id]);

  const addProductCarts = async (e) => {
    e.preventDefault();

    const insert = {
      categoryname: categoryname.current.value,
      image: image.current.src,
      productname: productname.current.value,
      oldprice: oldprice.current.value,
      newprice: newprice.current.value,
      addedate: addedate.current.value,
      qty: 1, // always add 1 when first added
      descriptions: descriptions.current.value,
    };

    try {
      // Check if already in cart
      const res = await axios.get(
        `http://localhost:8001/cart?productname=${productname.current.value}`
      );

      if (res.data.length > 0) {
        // already exists, update qty
        const existing = res.data[0];
        await axios.put(`http://localhost:8001/cart/${existing.id}`, {
          ...existing,
          qty: Number(existing.qty) + 1,
        });
        Swal.fire(
          "already added in Cart so Quantity Updated!",
          "Item quantity increased",
          "success"
        );
      } else {
        // not exists, add new item
        await Swal.fire({
          title: "Do you want to add in Cart?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.post(`http://localhost:8001/cart`, insert);
            Swal.fire("Cart added successfully", "", "success");
            navigate("/cart");
          } else if (result.isDenied) {
            Swal.fire("Action cancelled", "", "info");
          }
        });
      }
    } catch (error) {
      console.log("error generating", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              ref={image}
              alt="product"
              className="w-80 h-80 object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                ref={productname}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-800 font-bold text-2xl"
              />
            </div>

            {/* Prices */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Price
                </label>
                <input
                  type="text"
                  ref={newprice}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-blue-600 font-semibold text-xl"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Price
                </label>
                <input
                  type="text"
                  ref={oldprice}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-500 line-through"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                ref={categoryname}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            {/* Added Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Added Date
              </label>
              <input
                type="text"
                ref={addedate}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Qty
              </label>
              <input
                type="text"
                ref={qty}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                ref={descriptions}
                readOnly
                rows={3}
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Link
                to="/"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                Continue Shopping <FaShopify />
              </Link>
              <button
                type="button"
                onClick={addProductCarts}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                Add To Cart <FaCartPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
