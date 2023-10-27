import React, { useEffect, useState } from "react";
import "./UserManagers.css";
import axios from "axios";

const UserManagers = () => {
  const [data, setdata] = useState();
  const [CallAPI, setCallAPI] = useState(true);
  // gọi API lần đầu
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8080/api/v1/user/getalluser`
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

  function formatDate(date) {
    return date.split("T")[0];
  }

  const handleActive = async (id) => {
    try {
      const newdata = { status: 1 };
      const postIdProductOrder = await axios.patch(
        `http://localhost:8080/api/v1/user/patchuser/${id}`,
        newdata
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setCallAPI(!CallAPI);
  };

  const handleUnActive = async (id) => {
    try {
      const newdata = { status: 2 };
      const postIdProductOrder = await axios.patch(
        `http://localhost:8080/api/v1/user/patchuser/${id}`,
        newdata
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setCallAPI(!CallAPI);
  };

  return (
    <div>
      <div className="adminuser">
        <table className="tableuser">
          <tr>
            <th>NO</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>NUMBER PHONE</th>
            <th>ADDRESS</th>
            <th>BIRTHDAY</th>
            <th>ACTION</th>
          </tr>

          {data?.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>+84 {data.phoneNumber}</td>
                <td>{data.address}</td>
                <td>{formatDate(data.birthday)}</td>
                <td>
                  {data?.status == 1 ? (
                    <>
                      <button
                        id="btnunactive"
                        onClick={() => handleUnActive(data.id)}
                      >
                        UNACTIVE
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        id="btnactiveuser5"
                        onClick={() => handleActive(data.id)}
                      >
                        ACTIVE
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default UserManagers;
