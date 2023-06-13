import "bootstrap-4-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Add_Category from "./pages/Add_Category";
import Category from "./pages/Category";
import Hotel from "./pages/Hotel";
import Order from "./pages/Order";
import Add_hotel from "./pages/Add_hotel";
import Promo from "./pages/Promo";
import Add_Promo from "./pages/Add_Promo";
import Add_Recommended from "./pages/Add_Recommended";
import Recommended from "./pages/Recommended";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<SignIn />}>
          <Route path="/signup" element={<SignIn />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="add_category" element={<Add_Category />} />
          <Route path="category_list" element={<Category />} />
          <Route path="add_promo" element={<Add_Promo />} />
          <Route path="promo_list" element={<Promo />} />
          <Route path="add_recommended" element={<Add_Recommended />} />
          <Route path="recommended_list" element={<Recommended />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="add_category" element={<Add_Category />} />
          <Route path="category_list" element={<Category />} />
          <Route path="add_hotel" element={<Add_hotel />} />
          <Route path="hotel_list" element={<Hotel />} />
          <Route path="add_promo" element={<Add_Promo />} />
          <Route path="promo_list" element={<Promo />} />
          <Route path="add_recommended" element={<Add_Recommended />} />
          <Route path="recommended_list" element={<Recommended />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
