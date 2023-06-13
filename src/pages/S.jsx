import "bootstrap-4-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import Home from "./pages/Home";
import Add_Category from "../../pages/Add_Category";
import Home from "../../pages/Home";
import Category from "../../pages/Category";
import SignIn from "../../pages/SignIn";
import Hotel from "../../pages/Hotel";
import Order from "../../pages/Order";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Add_hotel from "../../pages/Add_hotel";
import Promo from "../../pages/Promo";
import Add_Promo from "../../pages/Add_Promo";
import Add_Recommended from "../../pages/Add_Recommended";
import Recommended from "../../pages/Recommended";
import AdminRoute from "../AdminRoute/AdminRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<SignIn />}>
          <Route path="/signup" element={<SignIn />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add_category" element={<Add_Category />} />
          <Route path="/category_list" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
