import "bootstrap-4-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Add_Category from "./pages/Add_Category";
import Category from "./pages/Category";
import Property from "./pages/Property";
import Orders from "./pages/Orders";
import Add_property from "./pages/Add_property";
import Promo from "./pages/Promo";
import Add_Promo from "./pages/Add_Promo";
import Add_Recommended from "./pages/Add_Recommended";
import Recommended from "./pages/Recommended";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
import Order from "./pages/Order";
import Add_Manager from "./pages/Add_manager";
import Manager from "./pages/Manager";
import Add_Branch from "./pages/Add_Branch";
import Branch from "./pages/Branch";
import Add_Facility from "./pages/Add_Facility";
import Facility from "./pages/Facility";
import Add_Seat from "./pages/Add_Seat";
import Seat from "./pages/Seat";
import Issue from "./pages/issue";
import Admin_property from "./pages/Admin_property";
import Admin_orders from "./pages/Admin_orders";
import Review from "./pages/Review";
import Issues from "./pages/Issues";
import Admin_issue from "./pages/Admin_issue";
import Admin_seat from "./pages/Admin_seat";
import Invoice from "./pages/details/Invoice";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<SignIn />}>
          <Route path="/signup" element={<SignIn />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/" element={<Home />} />

          <Route path="add_manager" element={<Add_Manager />} />
          <Route path="manager_list" element={<Manager />} />

          <Route path="add_category" element={<Add_Category />} />
          <Route path="category_list" element={<Category />} />
          <Route path="add_branch" element={<Add_Branch />} />
          <Route path="branch_list" element={<Branch />} />
          <Route path="add_facility" element={<Add_Facility />} />
          <Route path="facility_list" element={<Facility />} />
          <Route path="add_seat" element={<Add_Seat />} />
          <Route path="seat_list_m" element={<Seat />} />
          <Route path="seat_list" element={<Admin_seat />} />
          <Route path="add_property" element={<Add_property />} />
          <Route path="property_list_m" element={<Property />} />
          <Route path="property_list" element={<Admin_property />} />
          <Route path="add_promo" element={<Add_Promo />} />
          <Route path="promo_list" element={<Promo />} />
          <Route path="add_recommended" element={<Add_Recommended />} />
          <Route path="recommended_list" element={<Recommended />} />
          <Route path="orders_m" element={<Orders />} />
          <Route path="orders" element={<Admin_orders />} />
          <Route path="issue" element={<Issue />} />
          <Route path="issues_m" element={<Issues />} />
          <Route path="issues" element={<Admin_issue />} />
          <Route path="review" element={<Review />} />
          <Route path="invoice/:id" element={<Invoice />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
