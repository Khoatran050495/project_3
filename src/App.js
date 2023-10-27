import { Route, Routes } from "react-router-dom";
import "./App.css";
import Default from "./layout/Default/Default";
import UserManagers from "./components/usermanager/UserManagers";
import ManagerProduct from "./components/ManagerProduct/ManagerProduct";
import Editcomponent from "./components/edit/Editcomponent";
import Ordermanager from "./components/ordermanager/Ordermanager";
import Revenue from "./components/revenue/Revenue";
import Logincomponent from "./components/login/Logincomponent";
import RequireAuth from "./components/RequireAuth";
import Editproduct from "./components/editproduct/Editproduct.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Logincomponent />} />
        <Route element={<RequireAuth />}>
          <Route
            path="*"
            element={
              <Default>
                <Routes>
                  <Route
                    path="/usermanagers"
                    index
                    element={<UserManagers />}
                  />
                  <Route
                    path="/productsmanagers"
                    element={<ManagerProduct />}
                  />
                  <Route path="/addproduct" element={<Editcomponent />} />
                  <Route path="/editproduct" element={<Editproduct />} />
                  <Route path="/orders" element={<Ordermanager />} />
                  <Route path="/revenue" element={<Revenue />} />
                </Routes>
              </Default>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
