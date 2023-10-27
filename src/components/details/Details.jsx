import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CartItem } from "../../redux/reducer/CartSlice";

const Details = () => {
  const [data, setData] = useState([]);
  const getidproduct = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idproduct = Number(getidproduct.id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/getproducts/${idproduct}`
      );
      const newresponse = response.data.data;
      setData(newresponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCart = async (id) => {
    const User = JSON.parse(localStorage.getItem("userLogin"));
    if (User) {
      const idUser = User.id;
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/carditem/postcarditem/${id}/${idUser}`
        );
        navigate("/cart");
        dispatch(CartItem());
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="detailstotal">
      <p>DETAILS</p>
      <div className="detailspay">
        <div className="detailspay1">
          <p>Name: {data.nameProduct}</p>
          <p>Only $ {data.price}</p>
          <div className="votestartdetails">
            <div className="votestartdetails1">
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
            </div>
            <div className="votestartdetails2">
              <p>276/Reviews</p>
            </div>
          </div>
          <div className="btnmaddtocart">
            <button onClick={() => handleAddCart(data.id)}>
              <b>ADD TOO CART</b>
            </button>
          </div>
        </div>
        <div className="detailimg">
          <img src={data.imgBig} alt="cap" />
        </div>
      </div>

      <div className="escriptiondetails">
        <p>Description</p>
        <p>{data.content}</p>
      </div>
      <div>
        <p>Specs</p>
        <table className="detailstable">
          <tr>
            {data?.type == "bullet" ? (
              <>
                <th>Manufacturer</th>
                <th>Caliber</th>
                <th>Ammo Type</th>
                <th>Ammo Weight</th>
                <th>Pellet Shape</th>
                <th>Pellet Quantity</th>
              </>
            ) : (
              <>
                <th>Manufacturer</th>
                <th>Caliber</th>
                <th>Velocity</th>
                <th>Conditions</th>
                <th>Ammo Type</th>
                <th>Actions</th>
                <th>Barrel Style</th>
                <th>Fire Mode</th>
                <th>Gun Weight</th>
                <th>Loudness</th>
                <th>Mechanism</th>
              </>
            )}
          </tr>
          <tr>
            {data?.type == "bullet" ? (
              <>
                <td>{data.Spescproduct.manufacturer}</td>
                <td>{data.Spescproduct.caliber}</td>
                <td>{data.Spescproduct.ammo_type}</td>
                <td>{data.Spescproduct.Ammo_Weight}</td>
                <td>{data.Spescproduct.Pellet_Shape}</td>
                <td>{data.Spescproduct.Pellet_Quantity}</td>
              </>
            ) : (
              <>
                <td>{data?.Spescproduct?.manufacturer}</td>
                <td>{data?.Spescproduct?.caliber}</td>
                <td>{data?.Spescproduct?.velocity}</td>
                <td>{data?.Spescproduct?.conditions}</td>
                <td>{data?.Spescproduct?.ammo_type}</td>
                <td>{data?.Spescproduct?.actions}</td>
                <td>{data?.Spescproduct?.barrel_style}</td>
                <td>{data?.Spescproduct?.fire_mode}</td>
                <td>{data?.Spescproduct?.gun_weight}</td>
                <td className="hightlow">
                  {data?.Spescproduct?.loudness === 1 ? (
                    <p>Low</p>
                  ) : data?.Spescproduct?.loudness === 2 ? (
                    <p>Medium</p>
                  ) : (
                    <p>Hight</p>
                  )}
                </td>
                <td>{data?.Spescproduct?.mechanism}</td>
              </>
            )}
          </tr>
        </table>
      </div>
      <div className="reviewsstart">
        <p>Reviews</p>
        <div className="reviewsstart1">
          <div className="reviewsstart2">
            <p>Average Customer Review</p>
            <p>0/5 start</p>
            <div className="votestartdetails1">
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
            </div>
          </div>
        </div>
        <div className="votestart">
          <button>
            <b>VOTE START</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
