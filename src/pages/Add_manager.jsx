import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../contexts/UserProvider";
import { useForm } from "react-hook-form";

const Add_Manager = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const { registerUser } = useContext(AuthContext);

  const onSubmitRegister = async (data) => {
    const { name, address, email, phone, password, role } = data;

    await registerUser(name, address, email, phone, password, role);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const roles = ["admin", "user", "manager"];
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="registration_div card">
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <div className="row p-3">
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Name
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Email
                </label>
                <input
                  type="email"
                  className="main_form w-100"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is Required",
                  })}
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="main_form w-100"
                  placeholder="password"
                  {...register("password", {
                    required: "password is Required",
                  })}
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label htmlFor="inputState" className="profile_label3">
                  Role
                </label>
                <select
                  name="roleId"
                  id="inputState"
                  className="main_form w-100"
                  {...register("role")}
                >
                  <option>Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Add Manager
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Manager;
