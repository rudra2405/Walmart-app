import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Catagory({ setSelectedCategory }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/catagory`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">
      <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
        Select Category
      </h2>
      <ul className="space-y-3">
        {/* All option */}
        <li>
          <button
            onClick={() => setSelectedCategory("All")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-lg font-medium"
          >
            <FaArrowCircleRight className="text-blue-500" />
            All
          </button>
        </li>
        {data.map((row) => (
          <li key={row.id}>
            <button
              onClick={() => setSelectedCategory(row.categoryname)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-lg font-medium"
            >
              <FaArrowCircleRight className="text-blue-500" />
              {row.categoryname}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
