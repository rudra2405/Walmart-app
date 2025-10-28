import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteData = async () => {
      if (window.confirm("are you sure want to delete?")) {
        try {
          await axios.delete(`http://localhost:8001/products/${id}`);
          Swal.fire({
            title: "Good job!",
            text: "Your data successfully deleted!",
            icon: "success",
          });
          navigate("/admin/manage-products");
        } catch (error) {
          console.error("Error deleting product:", error);
          navigate("/admin/manage-products");
        }
      } else {
        navigate("/admin/manage-products");
      }
    };
    deleteData();
  }, [id, navigate]);

  return <div></div>;
}
