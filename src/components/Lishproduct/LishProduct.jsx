import React, { useEffect, useState } from "react";
import "./LishProduct.css";
import ProductCart from "../productcart/ProductCart";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingComponent from "../loadingComponent";

const LishProduct = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let valueSidebar = useSelector((state) => state.sideBarSlice.data);
  let status = useSelector((state) => state.sideBarSlice.status);

  // lấy value từ nút bấm trên Header sidebar
  const state = useLocation();
  const dataserch = state?.state?.data;
  valueSidebar = valueSidebar.split(",");
  const type = valueSidebar?.[0];
  const pricerange2 = valueSidebar?.[1];

  // gét lấy tất cả sản phẩm
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/products/getallproducts"
      );
      const newresponse = response.data.data;
      setData(newresponse);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // lọc sản phẩm theo type
  const hanlesearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/getproductstype/${dataserch}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  useEffect(() => {
    if (dataserch && dataserch !== "all") {
      hanlesearch();
    } else {
      fetchData();
    }
  }, [dataserch]);

  // lọc sản phẩm theo khoản value là : price

  const hanlegetvaluepriceranger = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/getproductvalue/${type}/${pricerange2}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  useEffect(() => {
    hanlegetvaluepriceranger();
  }, [status]);

  // lọc sản phẩm theo khoản value là : Velocity

  // const hanlegetvaluevelocity = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/v1/products/getproductvalue/${type}/${pricerange2}`
  //     );
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.error("Error deleting note:", error);
  //   }
  // };
  // useEffect(() => {
  //   hanlegetvaluepriceranger();
  // }, [status]);

  return (
    <div className="lishproduct">
      {isLoading && <LoadingComponent />}

      <p>ALL PRODUCTS</p>
      <div className="lishproduct1">
        <ProductCart products={data} />
      </div>
    </div>
  );
};

export default LishProduct;
