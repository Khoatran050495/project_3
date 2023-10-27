import React, { useEffect, useState } from "react";
import "./Purchasehistory.css";
import axios from "axios";
import LoadingComponent from "../loadingComponent";

const Purchasehistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const idUser = user.id;
  // gọi API lần đầu
  const fetchDataHistory = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/history/posthistory/${idUser}`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdata(postIdProductOrder1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataHistory();
  }, []);

  function formatDate(date) {
    return date.split("T")[0];
  }

  return (
    <div className="cart-page1">
      {isLoading && <LoadingComponent />}
      <div>
        <table className="table-cart1">
          <thead>
            <tr>
              <th>NO</th>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>DATE</th>
              <th>TOTAL MONEY</th>
              <th>PAYMENTS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.Product.nameProduct}</td>
                  <td>{data.Product.price.toLocaleString("en-GB")}</td>
                  <td>{data.Quantity}</td>
                  <td>{formatDate(data.createdAt)}</td>
                  <td>{Number(data.Total_Price)?.toLocaleString("en-GB")}</td>
                  <td>
                    {data.Payment == 1 ? (
                      <p>CASH</p>
                    ) : data.Payment == 4 ? (
                      <p>Agribank</p>
                    ) : data.Payment == 5 ? (
                      <p>Vietcombank</p>
                    ) : (
                      <p>Techcombank</p>
                    )}
                  </td>
                  <td className="btnoutlinedanger1">
                    {data.Status_history == 1 ? (
                      <p id="pending">PENDING</p>
                    ) : (
                      <p>SUCCESS</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchasehistory;
