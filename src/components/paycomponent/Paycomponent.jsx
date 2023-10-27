import React, { useEffect, useMemo, useState } from "react";
import "./Paycomponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartItem } from "../../redux/reducer/CartSlice";
import LoadingComponent from "../loadingComponent";

const Paycomponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const idUser = user.id;
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const dispatch = useDispatch();

  // gọi API lần đầu
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/orders/getorders/${idUser}`
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

  // totaldata để render
  const newdata = data?.[0];

  //  lọc ra cartitem để render
  const cartItem = newdata?.CartItems;

  // tính tổng tiền
  const totalprice = useMemo(() => {
    const total = cartItem?.reduce(
      (pre, urr) => pre + urr.Product.price * urr.Quantity,
      0
    );
    return total;
  }, [cartItem]);

  // ẩn hiện class BANK TRANSFER

  const handleCashChange = (event) => {
    setShowBankTransfer(event.target.value === "2");
    setPaymentMethod(event.target.value);
  };

  const handleBankTransferChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // gửi lên server để lưu vào bảng history
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    // đẩy dữ liệu lên bảng history
    const historyData = cartItem.map((item) => ({
      Orders_id: newdata?.Orders_id,
      CartItem_id: item?.CartItem_id,
      Users_id: newdata?.Users_id,
      Product_id: item?.Product_id,
      Payment: paymentMethod,
      Quantity: item?.Quantity,
      Total_Price: Number(item?.Quantity * item?.Product.price),
    }));

    // giảm số lượng trong kho
    cartItem.forEach((element) => {
      axios.patch(
        `http://localhost:8080/api/v1/products/editquantityproducts/${element.Quantity}/${element.Product_id}`
      );
    });

    // xóa trong giỏ hàng

    try {
      await axios.post(
        `http://localhost:8080/api/v1/history/posthistory`,
        historyData
      );
      await axios.delete(
        `http://localhost:8080/api/v1/carditem/deletecarditemall/${idUser}`
      );
      dispatch(CartItem());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
    navigate("/purchasehistory");
  };

  return (
    <div className="payment5">
      {isLoading && <LoadingComponent />}
      <div className="payment">
        <div className="payment1">
          <p>SELECT A PAYMENT METHOD</p>
        </div>
        <div className="payment4">
          <div className="payment6">
            <p>USER NAME: {user.username}</p>
            <p>PHONE NUMBER:+84 {user.phoneNumber}</p>
            <p>EMAIL: {user.email}</p>
            <p>TOTAL PAYMENT: $ {totalprice?.toLocaleString("en-GB")}</p>
          </div>

          <form action="" className="payment3" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cash">CASH</label>
              <select id="mycash" onChange={handleCashChange}>
                <option value="1">Cash</option>
                <option value="2">Transfer</option>
              </select>
            </div>
            {showBankTransfer && (
              <div className="form-group1">
                <label htmlFor="bank">BANK TRANSFER</label>
                <select id="mybank" onChange={handleBankTransferChange}>
                  <option value="">--Select--</option>
                  <option value="4">Agribank</option>
                  <option value="5">Vietcombank</option>
                  <option value="6">Techcombank</option>
                </select>
              </div>
            )}

            <div className="btnpay1">
              <button type="submit" className="btnpay">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paycomponent;
