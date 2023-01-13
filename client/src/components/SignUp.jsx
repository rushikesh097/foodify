import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {
  FILL_ALL_DATA,
  INVALID_EMAIL,
  PATTERN,
} from "../Data";

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const SignUp = (props) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: genders[0].value,
    password: "",
  });
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setMsg("");
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const addUser = (e) => {
    e.preventDefault();
    if (!PATTERN.test(user.email)) {
      setMsg(INVALID_EMAIL);
      return;
    } else if (user.name !== "" && user.password !== ""){
       axios
         .post("http://localhost:5000/user/adduser", {
           name: user.name,
           email: user.email,
           gender: user.gender,
           password: user.password,
         })
         .then((response) => {
           props.setUserId(response.data._id);
           props.setShowSignUp(false);
         })
         .catch((err) => {
           console.log(err);
           setMsg(err.message);
         });
         return;
    } 
    setMsg(FILL_ALL_DATA);
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => props.setShowSignUp(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <div className="text-center">
                <h4 className="text-lg font-medium text-gray-800">Sign Up</h4>
              </div>
              <form className="w-96">
                <div className="mb-6 mt-5">
                  <label
                    className="block text-indigo-900 text-sm font-bold mb-6"
                    htmlFor="email"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none focus:border-indigo-900 disabled:bg-gray-300"
                    type={"text"}
                    name={"name"}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
                <div className="mb-6 mt-5">
                  <label
                    className="block text-indigo-900 text-sm font-bold mb-6"
                    htmlFor="email"
                  >
                    E-Mail
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none focus:border-indigo-900 disabled:bg-gray-300"
                    type={"email"}
                    name={"email"}
                    onChange={handleChange}
                    placeholder="Email.."
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-indigo-900 text-sm font-bold mb-6"
                    htmlFor="email"
                  >
                    Gender
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none
                    cursor-pointer focus:border-indigo-900"
                    name="gender"
                    onChange={handleChange}
                  >
                    {genders.map((v, k) => (
                      <option
                        className="cursor-pointer"
                        value={v.value}
                        key={k}
                      >
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-indigo-900 text-sm font-bold mb-6"
                    htmlFor="email"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none focus:border-indigo-900 disabled:bg-gray-300"
                    type={"password"}
                    onChange={handleChange}
                    name={"password"}
                  />
                </div>
                <p className="text-red-600 text-xs italic">{msg}</p>
              </form>
              <div className="items-center gap-1 mt-4 sm:flex">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-yellow-500 rounded-md outline-none 
                  font-semibold ring-offset-2 ring-green-500 focus:ring-2"
                  onClick={addUser}
                >
                  Sign Up
                </button>
                <button className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-200 rounded-md outline-none ring-offset-2 ring-gray-500 focus:ring-2 font-semibold"
                onClick={()=>{props.setShowSignUp(false);}}>
                  Cancel
                </button>
              </div>
              <p
                className="text-center w-full mt-2 p-2.5 
                  flex-1 text-gray-800 hover:font-semibold cursor-pointer italic"
                onClick={() => {
                  props.setShowSignUp(false);
                  props.setShowLogIn(true);
                }}
              >
                Already have an account !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;