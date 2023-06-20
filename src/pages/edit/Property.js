import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useEffect } from "react";

const Property = ({ data }) => {
  console.log(data);
  const {
    _id,
    name,
    city,
    availble,
    desc,
    fulldesc,
    rating,
    perDay,
    perMonth,
    perYear,
    bedroom,
    bathroom,
    photos,
    car,
    bike,
    pet,
    categoryId,
    branchId,
    facility,
  } = data;
  const [user, setUser] = useState(data);
  const [files, setFiles] = useState("");
  const [categories, setCategories] = useState([]);
  const [branch, setBranch] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/branch");
        setBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/facility");
        setFacilities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
        photos: list,
      };

      await axios.put(`http://localhost:5001/api/property/${_id}`, product);
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
                <select
                  name="category"
                  value={categoryId}
                  id="inputState"
                  className="main_form w-100"
                >
                  <option value="">Select Type</option>
                  {categories.map((pd) => (
                    <option key={pd._id} value={pd._id}>
                      {pd.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Branch
                </label>
                <select
                  name="branch"
                  id="inputState"
                  value={user.branchId}
                  className="main_form w-100"
                  required
                >
                  <option>Select Type</option>
                  {branch.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label className="profile_label3">Facility</label>

                <div className="row mt-5">
                  {facilities.map((facility) => (
                    <div className="col-md-4" key={facility._id}>
                      <input
                        type="checkbox"
                        id={facility._id}
                        name="facility[]"
                        value={facility._id}
                        multiple
                      />
                      <label className="ms-2" htmlFor={facility._id}>
                        {facility.name}
                      </label>
                      <img
                        src={facility.photos[0]}
                        alt=""
                        className="facility_img"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Name
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="name"
                  defaultValue={name || ""}
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  City
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="city"
                  defaultValue={city || ""}
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Short Description
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="desc"
                  defaultValue={desc || ""}
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Full Description
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="fulldesc"
                  defaultValue={fulldesc}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Bedroom
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="bedroom"
                  defaultValue={bedroom || ""}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Bathroom
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="bathroom"
                  defaultValue={bathroom || ""}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Car
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="car"
                  defaultValue={car || ""}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Bike
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="bike"
                  defaultValue={bike || ""}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Pet
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="pet"
                  defaultValue={pet || ""}
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
                  defaultValue={perDay || ""}
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
                  defaultValue={perMonth || ""}
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
                  defaultValue={perYear || ""}
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
                  defaultValue={availble || ""}
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
                  defaultValue={rating || ""}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Property Picture
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
                  Edit Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Property;
