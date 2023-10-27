import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Headercomponet = () => {
  const isUpdate = useSelector((state) => state.Orders);
  const isProductManagement = useSelector((state) => state.ProductStock);
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [productMN, setproductMN] = useState([]);
  const [dataorders, setdataorders] = useState([]);
  const [stockproduct, setstockproduct] = useState([]);

  // gét sản phẩm về để lọc ra danh sách đặt hàng
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/history/getallhistory`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdata(postIdProductOrder1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [isUpdate]);

  const countNotApprovedProducts = () => {
    const notApprovedProducts = data.filter((item) => item.Status_history == 1);
    setdataorders(notApprovedProducts.length);
    return notApprovedProducts.length;
  };

  useEffect(() => {
    countNotApprovedProducts();
  }, [data]);

  // gét danh sách sản phẩm về để lọc ra sản phẩn sắp hết hàng

  const fetchDataProductmanage = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/products/getallproducts`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setproductMN(postIdProductOrder1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataProductmanage();
  }, [isProductManagement]);

  const StockingProducts = () => {
    const StockProducts = productMN.filter((item) => item.goodsInStock <= 5);
    setstockproduct(StockProducts.length);
    return StockProducts.length;
  };

  useEffect(() => {
    StockingProducts();
  }, [productMN]);

  // chức năng đăng xuất
  const handlelogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <div className="navcomponent">
        <img src="https://sassnet.com/images/sass-logo-2.png" alt="caption" />

        <div className="navchoose">
          <ul>
            <li>
              <button id="logout" onClick={() => handlelogout()}>
                LOG OUT
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="linecolor"></div>

      <div className="choosecar">
        <Link to={"/usermanagers"} id="btnchoosecar">
          USERS MANAGER
        </Link>
        <Link to={"/productsmanagers"} id="btnchoosecar1">
          PRODUCTS MANAGER
          <span>{stockproduct}</span>
        </Link>
        <Link to={"/orders"} id="btnchoosecar1">
          ORDER MANAGEMENT
          <span>{dataorders}</span>
        </Link>
        <Link to={"/revenue"} id="btnchoosecar">
          REVENUE MANAGEMENT
        </Link>
      </div>
    </>
  );
};

export default Headercomponet;
