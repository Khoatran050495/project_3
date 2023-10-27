import React, { useEffect, useState } from "react";
import "./Editproduct.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductStock } from "../../redux/reducer/productmanaSlice";

const Editproduct = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  const navigate = useNavigate();
  const dataserch = state?.state?.id;
  const [imgBig, setImgBig] = useState("");
  const [imgSmall, setImgSmall] = useState("");
  const [getform, setgetform] = useState({
    nameProduct: "",
    price: "",
    type: "",
    goodsInStock: "",
    color: "",
    content: "",
    manufacturer: "",
    caliber: "",
    velocity: "",
    conditions: "",
    ammo_type: "",
    actions: "",
    barrel_style: "",
    fire_mode: "",
    gun_weight: "",
    loudness: "",
    mechanism: "",
    Ammo_Weight: "",
    Pellet_Shape: "",
    Pellet_Quantity: "",
  });

  // gọi api lần đầu theo id
  const hanlegetvaluer1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/getproducts/${dataserch}`
      );
      const data = response.data.data;
      setImgBig(data.imgBig);
      setImgSmall(data.imgSmall);
      setgetform(data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  useEffect(() => {
    hanlegetvaluer1();
  }, []);

  // handle onchage
  const handlegetform = (e) => {
    setgetform({
      ...getform,
      [e.target.name]: e.target.value,
      Spescproduct: {
        ...getform.Spescproduct,
        [e.target.name]: e.target.value,
      },
    });
  };
  console.log(getform);

  // handle gửi update lên server
  const handlesubmitedit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Tạo đối tượng FormData để đưa dữ liệu và file vào

      // Đưa các trường thông tin sản phẩm vào FormData
      formData.append("imgBig", imgBig);
      formData.append("imgSmall", imgSmall);
      formData.append("nameProduct", getform.nameProduct);
      formData.append("price", getform.price);
      formData.append("type", getform.type);
      formData.append("goodsInStock", getform.goodsInStock);
      formData.append("color", getform.color);
      formData.append("content", getform.content);

      // Đưa các trường thông tin specs vào FormData
      formData.append("manufacturer", getform.Spescproduct?.manufacturer);
      formData.append("caliber", getform.Spescproduct?.caliber);
      formData.append("velocity", getform.Spescproduct?.velocity);
      formData.append("conditions", getform.Spescproduct?.conditions);
      formData.append("ammo_type", getform.Spescproduct?.ammo_type);
      formData.append("actions", getform.Spescproduct?.actions);
      formData.append("barrel_style", getform.Spescproduct?.barrel_style);
      formData.append("fire_mode", getform.Spescproduct?.fire_mode);
      formData.append("gun_weight", getform.Spescproduct?.gun_weight);
      formData.append("loudness", getform.Spescproduct?.loudness);
      formData.append("mechanism", getform.Spescproduct?.mechanism);
      formData.append("Ammo_Weight", getform.Spescproduct?.Ammo_Weight);
      formData.append("Pellet_Shape", getform.Spescproduct?.Pellet_Shape);
      formData.append("Pellet_Quantity", getform.Spescproduct?.Pellet_Quantity);

      // Gửi dữ liệu lên server bằng Axios
      await axios.patch(
        `http://localhost:8080/api/v1/products/editproductsadmin/${dataserch}`,
        formData
      );
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
    dispatch(ProductStock());
    navigate("/productsmanagers");
  };

  return (
    <div className="editcomponent">
      <div className="editcomponent1">
        <form
          className="editform"
          action="/addproducts"
          method="post"
          encType="multipart/form-data"
          onSubmit={handlesubmitedit}
        >
          <p>PRODUCT INFORMATION</p>
          <div className="tablegrip">
            <label htmlFor="">IMAGE BIG</label>
            <input
              type="file"
              name="imgBig"
              accept="image/*"
              onChange={(e) => setImgBig(e.target.files[0])}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">IMAGE SMALL</label>
            <input
              type="file"
              name="imgSmall"
              accept="image/*"
              onChange={(e) => setImgSmall(e.target.files[0])}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">NAME PRODUCT</label>
            <input
              type="text"
              name="nameProduct"
              placeholder="TEXT"
              value={getform?.nameProduct}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">PRICE</label>
            <input
              type="text"
              name="price"
              placeholder="NUMBER"
              value={getform?.price}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">CATEGORY</label>
            <input
              type="text"
              name="type"
              placeholder="TEXT"
              value={getform?.type}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">QUANTITY IN STOCK</label>
            <input
              type="text"
              name="goodsInStock"
              placeholder="NUMBER"
              value={getform?.goodsInStock}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">COLOR</label>
            <input
              type="text"
              name="color"
              placeholder="TEXT"
              value={getform?.color}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">DESCRIPTION</label>
            <input
              type="text"
              name="content"
              placeholder="TEXT"
              value={getform?.content}
              onChange={handlegetform}
            />
          </div>
          <br />
          <p>SPECS INFORMATION</p>
          <br />
          <div className="tablegrip">
            <label htmlFor="">
              MANUFACTURER <span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="manufacturer"
              placeholder="TEXT"
              value={getform?.Spescproduct?.manufacturer}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">
              CALIBER<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="caliber"
              placeholder="NUMBER"
              value={getform?.Spescproduct?.caliber}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">VELOCITY</label>
            <input
              type="text"
              name="velocity"
              placeholder="NUMBER"
              value={getform?.Spescproduct?.velocity}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">CONDITIONS</label>
            <input
              type="text"
              name="conditions"
              placeholder="TEXT"
              value={getform?.Spescproduct?.conditions}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">
              AMMO TYPE<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="ammo_type"
              placeholder="TEXT"
              value={getform?.Spescproduct?.ammo_type}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">ACTIONS</label>
            <input
              type="text"
              name="actions"
              placeholder="TEXT"
              value={getform?.Spescproduct?.actions}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">BARREL STYLE</label>
            <input
              type="text"
              name="barrel_style"
              placeholder="TEXT"
              value={getform?.Spescproduct?.barrel_style}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">FIRE MODE</label>
            <input
              type="text"
              name="fire_mode"
              placeholder="TEXT"
              value={getform?.Spescproduct?.fire_mode}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">GUN WEIGHT</label>
            <input
              type="text"
              name="gun_weight"
              placeholder="NUMBER"
              value={getform?.Spescproduct?.gun_weight}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">LOUDNESS</label>
            <input
              type="text"
              name="loudness"
              placeholder="NUMBER"
              value={getform?.Spescproduct?.loudness}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">MECHANISM</label>
            <input
              type="text"
              name="mechanism"
              placeholder="TEXT"
              value={getform?.Spescproduct?.mechanism}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">
              AMMO WEIGHT <span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="Ammo_Weight"
              placeholder="NUMBER"
              value={getform?.Spescproduct?.Ammo_Weight}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">
              PELLET SHAPE<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="Pellet_Shape"
              placeholder="TEXT"
              value={getform?.Spescproduct?.Pellet_Shape}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">
              PELLET QUANTITY<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="Pellet_Quantity"
              placeholder="TEXT"
              value={getform?.Spescproduct?.Pellet_Quantity}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="editform1">
            <div>
              <button id="btnactiveuser" type="submit">
                EDIT PRODUCT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editproduct;
