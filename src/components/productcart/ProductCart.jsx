import React from "react";
import "./ProductCart.css";
import { NavLink } from "react-router-dom";

const ProductCart = (props) => {
  const productdata = props.products;

  return (
    <>
      {productdata &&
        productdata?.map((product, index) => (
          <div className="totalcardproduct" key={index}>
            <div className="cardproductimg">
              <img src={product.imgSmall} alt="caption" />
            </div>
            <div className="cardproductcontent">
              <p title={product.nameProduct}>Name: {product.nameProduct}</p>
              <p>Price: {product.price} $</p>
            </div>
            <div className="votestart">
              <div className="votestart1">
                <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
                <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
                <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
                <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
                <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              </div>
              <div className="votestart2">
                <p>276/Reviews</p>
              </div>
            </div>
            {product.goodsInStock > 5 ? (
              <NavLink className="navlinkdetail" to={`/details/${product.id}`}>
                DETAIL
              </NavLink>
            ) : (
              <div id="imgsoldout">
                <img src="/image/soldout.jpg" />
              </div>
            )}
          </div>
        ))}
      ;
    </>
  );
};

export default ProductCart;
