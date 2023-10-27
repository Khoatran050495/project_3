import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus } from "../../redux/reducer/sidebarSice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const HeaderComponent = () => {
  const isUpdate = useSelector((state) => state.cartSlice);
  const [data, setdata] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userLogin"))
  );
  const id = JSON.parse(localStorage.getItem("userLogin"));
  const idUser = id?.id;

  // gọi API
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/orders/getorders/${idUser}`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;

      setdata(postIdProductOrder1[0].CartItems.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [isUpdate]);

  // totaldata để render

  //  lọc ra cartitem để render

  const handlelogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    setUser(undefined);
    navigate("/");
  };

  const handlesearch = (data) => {
    dispatch(changeStatus(""));
    navigate("/", { state: { data } });
  };

  return (
    <>
      <div className="navcomponent">
        <img src="https://sassnet.com/images/sass-logo-2.png" alt="caption" />

        <div className="navchoose">
          <ul>
            <li>
              <Link onClick={() => handlesearch("all")} to={"/"}>
                HOME PAGE
              </Link>
            </li>
            <li>
              <Link to={"/introduce"}>INTRODUCE</Link>
            </li>
            <li>
              <Link to={"/purchasehistory"}>PURCHASE HISTORY</Link>
            </li>
            <li>
              <Link id="shoppingcart" to={"/cart"}>
                CART <span>{data}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navchoose">
          <ul>
            {user ? (
              <>
                <li>
                  <img id="logoutimg" src="/image/avatar2.jpg" alt="cap" />
                </li>
                <li>
                  <button id="logout" onClick={() => handlelogout()}>
                    LOG OUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/Login"}>LOG IN</Link>
                </li>
                <li>
                  <Link to={"/register"}>REGISTER</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="linecolor"></div>

      <div className="choosecar">
        <button id="btnchoosecar" onClick={() => handlesearch("rifle")}>
          <div id="img">
            <img src="/image/longgun.png" alt="caption" />
          </div>
          RIFLE
        </button>
        <button id="btnchoosecar" onClick={() => handlesearch("pistols")}>
          <div id="img">
            <img src="/image/pistols.png" alt="caption" />
          </div>
          PISTOLS
        </button>
        <button id="btnchoosecar" onClick={() => handlesearch("bullet")}>
          <div id="img2">
            <img src="/image/dan.png" alt="caption" />
          </div>
          BULLET
        </button>
        <button id="btnchoosecar" onClick={() => handlesearch("armor")}>
          <div id="img3">
            <img src="/image/ao2.jpg" alt="caption" />
          </div>
          ARMOR
        </button>
      </div>
    </>
  );
};

export default HeaderComponent;
