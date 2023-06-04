import React from "react";
import Comment_list from "./Comment_list/Comment_list";
import Comment_report_list from "./Comment_report_list/Comment_report_list";
import "./Home.css";
import PostList from "./PostList/PostList";
import Post_report_list from "./Post_report_list/Post_report_list";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
            <div className="home_main">
              <div>
                <h1>Welcome to</h1>
                <img
                  src="/assets/img/logo1.png"
                  className="img-fluid"
                  style={{ width: 190 }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homes;
