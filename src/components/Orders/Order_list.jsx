import React, { useEffect, useState } from "react";
import img from "../../img/college/Icon material-delete.png";
import img3 from "../../img/college/Icon feather-edit.png";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import Category from "../../pages/edit/Category";
import { useContext } from "react";
import { AuthContext } from "../../contexts/UserProvider";
import Invoice from "../../pages/details/Invoice";
import { Link } from "react-router-dom";
const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="college_btn  mb-2 p-3" onClick={handleClick}>
        Export to CSV
      </button>
    </div>
  );
};
const Order_list = () => {
  const MySwal = withReactContent(Swal);
  const { user } = useContext(AuthContext);
  const email = user.email;
  //sub stream
  const [data, setData] = useState([]);

  const columns = [
    {
      text: "No",
      formatter: (cellContent, row, index) => {
        return (
          <>
            {" "}
            <p>{index + 1}</p>
          </>
        );
      },
    },

    {
      dataField: "firstName",
      text: "First Name",
    },
    {
      dataField: "lastName",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "phone",
      text: "Phone",
    },
    {
      dataField: "address",
      text: "Address",
    },
    // {
    //   dataField: "_id",
    //   text: "Invoice",
    // },

    {
      text: "Invoice",
      formatter: (cellContent, row) => {
        return (
          <>
            {" "}
            <Link to={`/invoice/${row._id}`}>Details</Link>
          </>
        );
      },
    },
    {
      dataField: "status",
      text: "Status",
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    style: { width: 60 },
    lastPageText: "Last",
    firstPageText: "First",
    nextPageText: "Next",
    prePageText: "Previous",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://psh-server.onrender.com/api/order`,
          {
            mode: "cors",
          }
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData(data);
  }, []);
  const main = data.filter((pd) => pd.email === email);
  const cart = main.map((pd) => pd.getState);
  // const propertyValue = cart ? cart[0][0][0]["property"] : "";
  // const pro = cart.map((pd) => pd);
  const desiredProperty = "property";
  let foundValue = null;

  cart.flatMap((arr1) =>
    arr1.flatMap((arr2) =>
      arr2.find((obj) => {
        if (obj.hasOwnProperty(desiredProperty)) {
          foundValue = obj[desiredProperty];
          return true; // Stop the iteration once property is found
        }
      })
    )
  );

  console.log(foundValue);

  // console.log(cart);

  //delete
  const [products, setProducts] = useState(data);
  const handleCategory = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const url = `https://psh-server.onrender.com/api/order/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          MySwal.fire("Good job!", "successfully deleted", "success");
          if (data.deletedCount === 1) {
            const remainItem = products.filter((item) => item._id !== id);
            setProducts(remainItem);
          }
        });
    }
  };
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Orders List</h6>
              </div>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            <div className="card">
              <div className="card-body card_body_sm">
                <>
                  <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    columns={columns}
                    data={main}
                    pagination={pagination}
                  >
                    {(props) => (
                      <React.Fragment>
                        <BootstrapTable
                          bootstrap4
                          keyField="id"
                          columns={columns}
                          data={main}
                          pagination={pagination}
                          {...props.baseProps}
                        />
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </>
              </div>
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}

      {/* Control Sidebar */}
    </div>
  );
};

export default Order_list;
