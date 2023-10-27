import React, { useEffect, useMemo, useState } from "react";
import "./Revenue.css";
import axios from "axios";

const Revenue = () => {
  const [data, setdata] = useState([]);

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
  }, []);

  // tính tổng tiền
  const totalprice = useMemo(() => {
    const total = data?.reduce((pre, urr) => pre + Number(urr.Total_Price), 0);
    return total;
  }, [data]);

  const number = totalprice;
  const result = Math.round(number);

  // fillter doanh thu
  const handlefillter = async (event) => {
    if (event.target.value == 13) {
      fetchDataOrder();
    } else {
      try {
        const getProductfillter = await axios.get(
          `http://localhost:8080/api/v1/history/gethistorywithmonth/${event.target.value}`
        );
        const newdata = getProductfillter.data.data;
        setdata(newdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <div>
      <div className="adminuser6">
        <div className="fitelform">
          <form action="">
            <div className="labelSelect">
              <label htmlFor="">FILTER</label>
              <select id="mycash" onChange={handlefillter}>
                <option value="01">JANUARY</option>
                <option value="02">FEBRUARY</option>
                <option value="03">MARCH</option>
                <option value="04">APRIL</option>
                <option value="05">MAY</option>
                <option value="06">JUNE</option>
                <option value="07">JULY</option>
                <option value="08">AUGUST</option>
                <option value="09">SEPTEMBER</option>
                <option value="10">OCTOBER</option>
                <option value="11">NOVEMBER</option>
                <option value="12">DECEMBER</option>
                <option value="13">ALL</option>
              </select>
            </div>
          </form>

          <div className="totalrevenue">
            <p>
              TOTAL REVENUE : <span>{result.toLocaleString("GB-en")} $</span>
            </p>
          </div>
        </div>
        <table className="tableuser6">
          <tr>
            <th>NO</th>
            <th>USERNAME</th>
            <th>NUMBER PHONE</th>
            <th>ADDRESS</th>
            <th>PRODUCT NAME</th>
            <th>ORDER DATE</th>
            <th>QUANTITY</th>
            <th>TOTAL PRICE</th>
          </tr>

          {data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.User.username}</td>
                <td>+84 {item.User.phoneNumber}</td>
                <td>{item.User.address}</td>
                <td>{item.Product.nameProduct}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.Quantity}</td>
                <td>{item.Total_Price}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Revenue;
