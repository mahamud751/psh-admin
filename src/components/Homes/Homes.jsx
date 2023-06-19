import React from "react";
import "./Home.css";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import img from "../../img/new/style.png";
import Property_list from "../Property/Property_list";
import Dashoboard_table from "./Dashboard_table";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Homes = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div>
        <div className="wrapper">
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper" style={{ background: "unset" }}>
            {/* <div className="home_main">
              <div>
                <h1>Welcome to</h1>
                <img
                  src={"https://i.ibb.co/GpqY8tQ/PSH-web-logo-1.png"}
                  alt=""
                  className="img-fluid"
                  style={{ width: 190 }}
                />
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-4">
                <div className="card_1">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img1" />
                    </div>
                    <div className="ms-3 text-white">
                      <p>Total Booking</p>
                      <p>450</p>
                      <p>60% Increase in 28 Days</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card_2">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img2" />
                    </div>
                    <div className="ms-3 text-white">
                      <p>Total Booking</p>
                      <p>450</p>
                      <p>60% Increase in 28 Days</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card_3">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img3" />
                    </div>
                    <div className="ms-3 text-white">
                      <p>Total Booking</p>
                      <p>450</p>
                      <p>60% Increase in 28 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Dashoboard_table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homes;
