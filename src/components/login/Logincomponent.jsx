import React, { useEffect, useState } from "react";
import "./Logincomponent.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer/userSlice";
import LoadingComponent from "../loadingComponent";

const Logincomponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState();
  const [getform, setgetform] = useState({
    username: "",
    passwords: "",
  });

  const handlegetform = (e) => {
    setgetform({
      ...getform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let data = await dispatch(login(getform)).unwrap();
      if (data.message === "Request failed with status code 401") {
        setIsLoading(false);
        seterror("User account or password incorrect");
      } else if (data === "error") {
        setIsLoading(false);
        seterror("You do not have access");
      } else {
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <LoadingComponent />}
      <div className="logincomponent1">
        <div className="logincomponent2">
          <div className="loginimg">
            <img
              src="https://sassnet.com/images/sass-logo-2.png"
              alt="caption"
            />
          </div>
        </div>

        <form className="loginform" onSubmit={handleSubmit}>
          <label htmlFor="">USERNAME</label>
          <br />
          <input type="text" name="username" onChange={handlegetform} />
          <br />
          <label htmlFor="">PASSWORD</label>
          <br />
          <input type="password" name="passwords" onChange={handlegetform} />
          <span>{error}</span>
          <br />
          <div className="btnlogin">
            <button type="submit">LOGIN</button>
          </div>
          <div className="loginform1">
            <Link className="gotoregister" to={"/register"}>
              Go to Register
            </Link>
            <Link className="gotoregister" to={"/"}>
              Go to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logincomponent;
