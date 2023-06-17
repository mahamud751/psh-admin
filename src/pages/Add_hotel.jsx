import axios from "axios";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Add_hotel = () => {
  const [kitchen, setKitchen] = useState(false);
  const [tv, setTV] = useState(false);
  const [washer, setWasher] = useState(false);
  const [balcony, setBalcony] = useState(false);
  const [netflix, setNetflix] = useState(false);
  const [wifi, setWifi] = useState(false);

  const [files, setFiles] = useState("");
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://psh-server.onrender.com/api/category`,
          {
            mode: "cors",
          }
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data3 = {
      // existing fields...
      kitchen,
      tv,
      washer,
      balcony,
      netflix,
      wifi,
    };
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

      category: {
        id: formData.get("categoryId"),
      },
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
        ...data3,
        photos: list,
      };

      await axios.post("https://psh-server.onrender.com/api/hotels", product);
      MySwal.fire("Good job!", "successfully added", "success");
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="registration_div card p-3">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Type
                </label>
                <select
                  name="categoryId"
                  id="inputState"
                  className="main_form w-100"
                >
                  <option selected>Select Type</option>
                  {data.map((pd) => (
                    <option key={pd._id} value={pd._id}>
                      {pd.name}
                    </option>
                  ))}
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
              <div className="col-md-4 form_sub_stream">
                <i className="fa-solid fa-kitchen-set fa-xl mx-2 "></i>
                <label htmlFor="kitchen" className="form-label profile_label3">
                  Kitchen
                </label>
                <input
                  type="checkbox"
                  id="kitchen"
                  checked={kitchen}
                  onChange={(e) => setKitchen(e.target.checked)}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="tv" className="form-label profile_label3">
                  TV
                </label>
                <input
                  type="checkbox"
                  id="tv"
                  checked={tv}
                  onChange={(e) => setTV(e.target.checked)}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="washer" className="form-label profile_label3">
                  Washer
                </label>
                <input
                  type="checkbox"
                  id="washer"
                  checked={washer}
                  onChange={(e) => setWasher(e.target.checked)}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="balcony" className="form-label profile_label3">
                  Balcony
                </label>
                <input
                  type="checkbox"
                  id="balcony"
                  checked={balcony}
                  onChange={(e) => setBalcony(e.target.checked)}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="netflix" className="form-label profile_label3">
                  Netflix
                </label>
                <input
                  type="checkbox"
                  id="netflix"
                  checked={netflix}
                  onChange={(e) => setNetflix(e.target.checked)}
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="wifi" className="form-label profile_label3">
                  Wifi
                </label>
                <input
                  type="checkbox"
                  id="wifi"
                  checked={wifi}
                  onChange={(e) => setWifi(e.target.checked)}
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
                  name="img"
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
                Add Hotel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_hotel;
