import React from "react";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../redux/reducer/sidebarSice";

const Sidebarcomponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlefillter = (data1) => {
    dispatch(changeStatus(data1));
    navigate("/");
  };

  const state = useLocation();
  const dataserch = state?.state?.data;

  return (
    <div className="sidebar1">
      <p>FILTER BY</p>
      {dataserch === "bullet" ? (
        <>
          {/* fillter cho đạn */}
          <div className="sidebar2">
            <p>Caliber</p>
            <button>0.20</button>
            <button>0.22</button>
            <button>0.25</button>
            <button>0.30</button>
            <button>0.45</button>
            <button>0.50</button>
          </div>
          <div className="sidebar2">
            <p>Price</p>
            <button onClick={() => handlefillter("bullet,0-10")}>
              $ 0 - $ 10
            </button>
            <button onClick={() => handlefillter("bullet,10-20")}>
              $ 10 - $ 20
            </button>
          </div>
          <div className="sidebar2">
            <p>Ammo Weight</p>
            <button>10.30</button>
            <button>10.40</button>
            <button>10.60</button>
            <button>11.45</button>
            <button>12.96</button>
            <button>14.50</button>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar2">
            <p>Velocity (FPS)</p>
            <button onClick={() => handlefillter("velocity,250-500")}>
              250 - 500
            </button>
            <button onClick={() => handlefillter("velocity,500-750")}>
              500 - 750
            </button>
            <button onClick={() => handlefillter("velocity,750-1000")}>
              750 - 1000
            </button>
            <button onClick={() => handlefillter("velocity,1000-2000")}>
              1000 and Up
            </button>
          </div>
          <div className="sidebar2">
            <p>Price</p>
            <button onClick={() => handlefillter("rifle-pistols,0-100")}>
              $ 0 - $ 100
            </button>
            <button onClick={() => handlefillter("rifle-pistols,100-250")}>
              $ 100 - $ 250
            </button>
            <button onClick={() => handlefillter("rifle-pistols,250-500")}>
              $ 250 - $ 500
            </button>
            <button onClick={() => handlefillter("rifle-pistols,500-1000")}>
              $ 500 - $ 1,000
            </button>
            <button onClick={() => handlefillter("rifle-pistols,1000-2000")}>
              $ 1,000+
            </button>
          </div>
          <div className="sidebar2">
            <p>Loudness</p>
            <button>Low</button>
            <button>Medium</button>
            <button>High</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebarcomponent;
