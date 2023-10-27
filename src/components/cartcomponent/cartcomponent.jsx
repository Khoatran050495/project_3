import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cartcomponent.css";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { CartItem } from "../../redux/reducer/CartSlice";
import LoadingComponent from "../loadingComponent";

const Cartcomponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();
  const [fecthAPI, setfecthAPI] = useState(true);
  const id = JSON.parse(localStorage.getItem("userLogin"));
  const idUser = id.id;
  const dispatch = useDispatch();
  // gọi API
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/orders/getorders/${idUser}`
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
    fetchDataOrder();
  }, [fecthAPI]);

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

  const handlePlus = async (id) => {
    setIsLoading(true);
    await axios.post(
      `http://localhost:8080/api/v1/carditem/postcarditem/${id}/${idUser}`
    );
    setfecthAPI(!fecthAPI);
    setIsLoading(false);
  };

  const handleMinus = async (id) => {
    setIsLoading(true);
    await axios.post(
      `http://localhost:8080/api/v1/carditem/minuscarditem/${id}/${idUser}`
    );
    setfecthAPI(!fecthAPI);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await axios.delete(
      `http://localhost:8080/api/v1/carditem/deletecarditem/${id}/${idUser}`
    );
    setfecthAPI(!fecthAPI);
    dispatch(CartItem());
    setIsLoading(false);
  };

  return (
    <div className="cart-page">
      {isLoading && <LoadingComponent />}
      <div>
        <table className="table-cart">
          <thead>
            <tr>
              <th>NO</th>
              <th>PRODUCT PICTURES</th>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL MONEY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cartItem?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.Product.imgSmall} alt="Ảnh sản phẩm" />
                  </td>
                  <td>{item.Product.nameProduct}</td>
                  <td className="text-danger">{Number(item.Product.price)}</td>
                  <td className="quantityshoppingcart">
                    <button onClick={() => handleMinus(item.Product_id)}>
                      -
                    </button>
                    <span className="mx-3 bg-white">
                      {Number(item.Quantity)}
                    </span>
                    <button onClick={() => handlePlus(item.Product_id)}>
                      +
                    </button>
                  </td>
                  <td className="fw-bold ">
                    {Number(
                      item?.Quantity * item?.Product.price
                    )?.toLocaleString("en-GB")}
                  </td>
                  <td>
                    <button
                      className="btnoutlinedanger"
                      onClick={() => handleDelete(item.Product_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="totalpayment">
        <div className="total-money">
          <b>TOTAL PAYMENT : </b>
          <span className="spantotalpayment">
            {totalprice?.toLocaleString("en-GB")}
          </span>
        </div>
        <Link className="btntoltalpayment" to={"/pay"}>
          PAY
        </Link>
      </div>
    </div>
  );
};

export default Cartcomponent;
