import axios from "axios";

import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../contexts/UserProvider";
import { useContext } from "react";
const Add_property = () => {
  const { user } = useContext(AuthContext);

  const [files, setFiles] = useState("");
  const MySwal = withReactContent(Swal);
  const [categories, setCategories] = useState([]);
  const [branch, setBranch] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const formRef = useRef(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedFacilities = [];
    facilities.forEach((facility) => {
      if (formData.getAll("facility[]").includes(facility._id)) {
        selectedFacilities.push(facility.name);
      }
    });

    const data2 = {
      name: formData.get("name"),
      type: formData.get("type"),
      city: formData.get("city"),
      availble: formData.get("availble"),
      rating: formData.get("rating"),
      perDay: formData.get("perDay"),
      desc: formData.get("desc"),
      fulldesc: formData.get("fulldesc"),
      bedroom: formData.get("bedroom"),
      bathroom: formData.get("bathroom"),
      car: formData.get("car"),
      bike: formData.get("bike"),
      pet: formData.get("pet"),
      perMonth: formData.get("perMonth"),
      perYear: formData.get("perYear"),
      categoryId: formData.get("category"),
      branchId: formData.get("branch"),
      recommended: formData.get("recommended"),
      facility: selectedFacilities,
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
        ...data2,
        photos: list,
      };

      await axios.post("http://localhost:5001/api/property", product);
      MySwal.fire("Good job!", "successfully added", "success");
      formRef.current.reset();
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="registration_div card p-3">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Property Type
                </label>
                <select
                  name="category"
                  id="inputState"
                  className="main_form w-100"
                >
                  <option>Select Type</option>
                  {categories.map((pd) => (
                    <option key={pd._id} value={pd._id}>
                      {pd.name}
                    </option>
                  ))}
                </select>
              </div>
              {user && user.role === "admin" ? (
                <div className="col-md-6 form_sub_stream ">
                  <label htmlFor="inputState" className="profile_label3">
                    Branch
                  </label>
                  <select
                    name="branch"
                    id="inputState"
                    className="main_form w-100"
                    required
                  >
                    <option value="">Select Type</option>
                    {branch.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="col-md-6 form_sub_stream ">
                  <label htmlFor="inputState" className="profile_label3">
                    Branch
                  </label>
                  <select
                    name="branch"
                    id="inputState"
                    className="main_form w-100"
                    required
                  >
                    <option value={user.branch._id}>{user.branch.name}</option>
                  </select>
                </div>
              )}
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Recommended
                </label>
                <select
                  name="recommended"
                  id="inputState"
                  className="main_form w-100"
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
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
                  placeholder="Name"
                />
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
                  City
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="city"
                  placeholder="city"
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
                  placeholder="Short Description"
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
                  placeholder="Full Description"
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
                  placeholder="bedroom"
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
                  placeholder="bathroom"
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
                  placeholder="car"
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
                  placeholder="bike"
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
                  placeholder="pet"
                />
              </div>

              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Per Day
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="perDay"
                  placeholder="Per Day"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Per Month
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="perMonth"
                  placeholder="Per Month"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Per Year
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="perYear"
                  placeholder="Per Year"
                />
              </div>

              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Availble
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="availble"
                  placeholder="availble"
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Rating
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="rating"
                  placeholder="Rating"
                />
              </div>

              {/* <div className="col-md-6 form_sub_stream">
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
              </div> */}
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Image
                </label>
                <input
                  type="file"
                  id="file"
                  className="main_form w-100 p-0"
                  name="photos"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                />
              </div>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
                onSubmit={handleSubmit}
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_property;
