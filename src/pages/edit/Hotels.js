import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useEffect } from "react";

const Hotels = ({ data }) => {
  const { _id, name } = data;
  const [user, setUser] = useState(data);
  const [files, setFiles] = useState("");
  const [data2, setData] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get(`http://localhost:5001/api/category`, {
  //         mode: "cors",
  //       });
  //       setData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, []);
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
        photos: list,
      };

      await axios.put(`http://localhost:5001/api/hotels/${_id}`, product);
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
                  Type
                </label>
                <select name="type" id="inputState" className="main_form w-100">
                  <option selected>Select Type</option>

                  <option key={"Premium"} value={"Premium"}>
                    Standard
                  </option>
                  <option key={"Standard"} value={"Standard"}>
                    Premium
                  </option>
                  <option key={"Normal"} value={"Normal"}>
                    Normal
                  </option>
                </select>
              </div>

              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="desc"
                  onBlur={handleOnBlur}
                  defaultValue={user.desc || ""}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Per Day
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="perDay"
                  onBlur={handleOnBlur}
                  defaultValue={user.perDay || ""}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Per Month
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="perMonth"
                  onBlur={handleOnBlur}
                  defaultValue={user.perMonth || ""}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Per Year
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="perYear"
                  onBlur={handleOnBlur}
                  defaultValue={user.perYear || ""}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Avaliblilty
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="availble"
                  onBlur={handleOnBlur}
                  defaultValue={user.availble || ""}
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

              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Hotel Picture
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
                  Edit Hotel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Hotels;
