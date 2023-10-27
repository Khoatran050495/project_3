import "./App.css";
import Registercomponent from "./components/Register/Register";
import Logincomponent from "./components/login/Logincomponent";
import { Route, Routes } from "react-router-dom";
import LoginRegisterLayout from "./layout/LoginRegisterLayout/LoginRegisterLayout";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import Introduce from "./components/Introduce/Introduce";
import Cartcomponent from "./components/cartcomponent/cartcomponent";
import Purchasehistory from "./components/purchasehistory/Purchasehistory";
import Paycomponent from "./components/paycomponent/Paycomponent";
import LishProduct from "./components/Lishproduct/LishProduct";
import Details from "./components/details/Details";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/introduce"
          element={
            <DefaultLayout>
              <Introduce />
            </DefaultLayout>
          }
        />
        <Route element={<RequireAuth />}>
          <Route
            path="/cart"
            element={
              <DefaultLayout>
                <Cartcomponent />
              </DefaultLayout>
            }
          />
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/purchasehistory"
            element={
              <DefaultLayout>
                <Purchasehistory />
              </DefaultLayout>
            }
          />
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/pay"
            element={
              <DefaultLayout>
                <Paycomponent />
              </DefaultLayout>
            }
          />
        </Route>
        <Route
          path="/details/:id"
          element={
            <DefaultLayout>
              <Details />
            </DefaultLayout>
          }
        />
        <Route
          path="/"
          index
          element={
            <DefaultLayout>
              <LishProduct />
            </DefaultLayout>
          }
        />

        <Route
          path="/login"
          element={
            <LoginRegisterLayout>
              <Logincomponent />
            </LoginRegisterLayout>
          }
        />
        <Route
          path="/register"
          element={
            <LoginRegisterLayout>
              <Registercomponent />
            </LoginRegisterLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
