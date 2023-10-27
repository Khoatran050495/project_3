import React, { useEffect, useState } from "react";
import "./ManagerProduct.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ProductStock } from "../../redux/reducer/productmanaSlice";

const ManagerProduct = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState();
  const [CallAPI, setCallAPI] = useState(true);
  const navigate = useNavigate();
  // gọi API lần đầu
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/products/getallproducts`
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

  // Lọc sản phẩm có số lượng ít hơn 5
  const lessThanFive = data?.filter((product) => product.goodsInStock <= 5);

  // Lọc sản phẩm có số lượng lớn hơn hoặc bằng 5
  const greaterThanOrEqualFive = data?.filter(
    (product) => product.goodsInStock > 5
  );
  // đẩy sản phẩm sắp hết hàng lên trên cùng
  const mergedProducts = lessThanFive?.concat(greaterThanOrEqualFive);

  // gửi id sang trang edit
  const handleEdit = async (id) => {
    navigate("/editproduct", { state: { id } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/products/deleteproducts/${id}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    dispatch(ProductStock());
    setCallAPI(!CallAPI);
  };

  return (
    <div>
      <div className="adminuser1">
        <div className="addprodut2">
          <Link className="addprodut1" to={"/addproduct"}>
            ADD PRODUCT
          </Link>
        </div>

        <table className="tableuser1">
          <tr>
            <th>NO</th>
            <th>IMAGE</th>
            <th>NAME PRODUCT</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>CONDITION OF GOODS</th>
            <th>QUANTITY IN STOCK</th>
            <th>ACTION</th>
          </tr>

          {mergedProducts?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="imgproduct">
                  <img src={item?.imgSmall} alt="cap" />
                </td>
                <td>{item?.nameProduct}</td>
                <td>{item?.price}</td>
                <td>{item?.type} </td>
                <td>
                  <div className="totalstock">
                    <div>
                      {item?.goodsInStock > 5 ? (
                        <>
                          <div id="stocking">STOCKING</div>
                        </>
                      ) : (
                        <>
                          <div id="outofstock">OUT OF STOCK</div>
                        </>
                      )}
                    </div>
                  </div>
                </td>
                <td>{item?.goodsInStock}</td>
                <td>
                  <button
                    id="btnactiveuser2"
                    onClick={() => handleEdit(item?.id)}
                  >
                    EDIT
                  </button>
                  <button
                    id="btnunactive1"
                    onClick={() => handleDelete(item?.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ManagerProduct;
