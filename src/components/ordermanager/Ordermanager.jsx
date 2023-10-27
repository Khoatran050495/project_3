import React, { useEffect, useState } from "react";
import "./Ordermanager.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../redux/reducer/OrderSlice";

const Ordermanager = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const [CallAPI, setCallAPI] = useState(true);

  function formatDate(date) {
    return date.split("T")[0];
  }
  // gọi API lần đầu
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
  }, [CallAPI]);

  const handleapprove = async (id) => {
    try {
      const postIdProductOrder = await axios.patch(
        `http://localhost:8080/api/v1/history/poststatushistory/${id}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    dispatch(CartItem());
    setCallAPI(!CallAPI);
  };

  return (
    <div>
      <div className="adminuser">
        <table className="tableuser">
          <tr>
            <th>NO</th>
            <th>USERNAME</th>
            <th>NUMBER PHONE</th>
            <th>ADDRESS</th>
            <th>PRODUCT NAME</th>
            <th>COLOR</th>
            <th>ORDER DATE</th>
            <th>QUANTITY</th>
            <th>TOTAL PRICE</th>
            <th>ACTION</th>
          </tr>

          {data?.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.User.username}</td>
                <td>+84 {data.User.phoneNumber}</td>
                <td>{data.User.address}</td>
                <td>{data.Product.nameProduct}</td>
                <td>{data.Product.color}</td>
                <td>{formatDate(data.createdAt)}</td>
                <td>{data.Quantity}</td>
                <td>{data.Total_Price}</td>
                <td>
                  {data.Status_history == 1 ? (
                    <>
                      <button
                        id="notapprove"
                        onClick={() => handleapprove(data.History_id)}
                      >
                        NOT APPROVED YET
                      </button>
                    </>
                  ) : (
                    <>
                      <button id="approve">APPROVED</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Ordermanager;
