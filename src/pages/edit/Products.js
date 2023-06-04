import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useEffect } from "react";

const Products = ({ data }) => {
  const { _id, name } = data;
  const [user, setUser] = useState(data);
  const [files, setFiles] = useState("");
  const [data2, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/category`, {
          mode: "cors",
        });
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const MySwal = withReactContent(Swal);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...user };
    newInfo[field] = value;
    setUser(newInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      ...user,
    };
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const product = {
        ...newPost,
        img: list,
      };

      await axios.put(`http://localhost:5001/api/products/${_id}`, product);
      MySwal.fire("Good job!", "successfully edited", "success");
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <div className="card-body row">
              <div className="col-md-12 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Category
                </label>
                <select
                  name="categoryId"
                  id="inputState"
                  className="main_form w-100"
                >
                  <option selected>Select Category</option>
                  {data2.map((pd) => (
                    <option key={pd._id} value={pd._id}>
                      {pd.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="name"
                  onBlur={handleOnBlur}
                  defaultValue={name || ""}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Short Description
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="shortDescription"
                  onBlur={handleOnBlur}
                  defaultValue={user.shortDescription || ""}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  FullDescription
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="fullDescription"
                  onBlur={handleOnBlur}
                  defaultValue={user.fullDescription || ""}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Price
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="realPrice"
                  onBlur={handleOnBlur}
                  defaultValue={user.realPrice || ""}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Buy Price
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="buyPrice"
                  onBlur={handleOnBlur}
                  defaultValue={user.buyPrice || ""}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Offer Price
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="offerPrice"
                  onBlur={handleOnBlur}
                  defaultValue={user.offerPrice || ""}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Quantity
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="qtn"
                  onBlur={handleOnBlur}
                  defaultValue={user.qtn || ""}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Rating
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="rating"
                  onBlur={handleOnBlur}
                  defaultValue={user.rating || ""}
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label className="profile_label3">Product Type</label>
                <select
                  id="inputState"
                  name="productType"
                  className="main_form w-100"
                >
                  <option value="regular">Regular</option>
                  <option value="offer">Offer</option>
                  <option value="flashsale">FlashSale</option>
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label className="profile_label3">Status</label>
                <select
                  id="inputState"
                  name="status"
                  className="main_form w-100"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Product Picture
                </label>
                <input
                  type="file"
                  id="file"
                  className="main_form w-100 p-0"
                  name="img"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="profile_btn"
                  style={{ width: 220 }}
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Products;
