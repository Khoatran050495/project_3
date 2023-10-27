import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/reducer/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registercomponent = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //tạo oject rỗng chứa from
  const [getform, setgetform] = useState({
    username: "",
    email: "",
    passwords: "",
    phoneNumber: "",
    birthday: "",
    address: "",
  });
  // tạo oject rỗng để validate
  const [username, setusername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [birthday, setbirthday] = useState("");
  const [address, setaddress] = useState("");

  //  chức năng lấy dữ liệu từ form
  const handlegetform = (e) => {
    if (e.target.name === "username") {
      setusername("");
    }
    if (e.target.name === "email") {
      setErrorEmail("");
    }
    if (e.target.name === "passwords") {
      setErrorPass("");
    }
    if (e.target.name === "phoneNumber") {
      setphoneNumber("");
    }
    if (e.target.name === "birthday") {
      setbirthday("");
    }
    if (e.target.name === "address") {
      setaddress("");
    }
    setgetform({ ...getform, [e.target.name]: e.target.value });
  };

  // chuyển hướng đăng nhập thành công
  const returnHome = () => {
    navigate("/Login");
  };

  // kiểm tra validate và chuyển dữ liệu đi
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      getform.username === "" ||
      getform.email === "" ||
      getform.passwords === "" ||
      getform.phoneNumber === "" ||
      getform.birthday === "" ||
      getform.address === ""
    ) {
      if (getform.username === "") {
        setusername("USERNAME MUST NOT BE BLANK");
      }
      if (getform.email === "") {
        setErrorEmail("EMAIL MUST NOT BE BLANK");
      }
      if (getform.passwords === "") {
        setErrorPass("PASSWORDS MUST NOT BE BLANK");
      }
      if (getform.phoneNumber === "") {
        setphoneNumber("PHONE NUMBER MUST NOT BE BLANK");
      }
      if (getform.birthday === "") {
        setbirthday("BIRTHDAY MUST NOT BE BLANK ");
      }
      if (getform.address === "") {
        setaddress("ADDRESS MUST NOT BE BLANK");
      }
    } else {
      const data = await dispatch(register(getform)).unwrap();
      if (data.status === 200) {
        toast.success("Register in successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        data && setTimeout(returnHome, 2000);
      } else {
        toast.error(data.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="registercomponent1">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="registercomponent2">
        <div className="registerimg">
          <img src="https://sassnet.com/images/sass-logo-2.png" alt="caption" />
        </div>
      </div>

      <form className="registerform" onSubmit={handleSubmit}>
        <label htmlFor="">USERNAME</label>
        <br />
        <input type="text" name="username" onChange={handlegetform} />
        <span>{username}</span>
        <br />
        <label htmlFor="">EMAIL</label>
        <br />
        <input type="text" name="email" onChange={handlegetform} />
        <span>{errorEmail}</span>
        <br />
        <label htmlFor="">PASSWORD</label>
        <br />
        <input type="password" name="passwords" onChange={handlegetform} />
        <span>{errorPass}</span>
        <br />
        <label htmlFor="">PHONE NUMBER</label>
        <br />
        <input type="text" name="phoneNumber" onChange={handlegetform} />
        <span>{phoneNumber}</span>
        <br />
        <label htmlFor="">BIRTHDAY</label>
        <br />
        <input type="date" name="birthday" onChange={handlegetform} />
        <span>{birthday}</span>
        <br />
        <label htmlFor="">ADDRESS</label>
        <br />
        <input
          type="text"
          name="address"
          placeholder="DA NANG"
          onChange={handlegetform}
        />
        <span>{address}</span>
        <br />
        <div className="btnregister1">
          <div className="btnregister">
            <button type="submit">REGISTER</button>
          </div>
        </div>

        <Link className="gotohome" to={"/"}>
          Go to Home
        </Link>
      </form>
    </div>
  );
};

export default Registercomponent;
