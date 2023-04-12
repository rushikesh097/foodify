import React, {useState} from 'react'
import axios from 'axios';
import { FILL_ALL_DATA, INVALID_EMAIL, PATTERN } from "../Data";

const EditProfile = (props) => {

    const [edituser, setEditUser] = useState({
      name: props.user.name,
      email: props.user.email,
      password: "",
    });

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
      e.preventDefault();
      setMsg("");
      setEditUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const editUser = (e) => {
      e.preventDefault();
      if (!PATTERN.test(edituser.email)) {
        setMsg(INVALID_EMAIL);
        return;
      } else if (edituser.name !== "" && edituser.password !== "") {
        axios
          .put("http://localhost:5000/user/updateuserdetails", {
            _id: props.user._id,
            name: edituser.name,
            email: edituser.email,
            password: edituser.password
          })
          .then((response) => {
            console.log(response.data);
            props.setUser({
              _id: props.user._id,
              name: edituser.name,
              email: edituser.email,
              gender: props.user.gender,
              password: edituser.password,
            });
            sessionStorage.setItem("username",edituser.name)
            props.setShowEditProfile(false);
          })
          .catch((err) => {
            console.log(err);
            setMsg(err.message);
          });
        return;
      }
      setMsg(FILL_ALL_DATA);
    };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto mt-10">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => props.setShowEditProfile(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <div className="text-center">
                <h4 className="text-lg font-medium text-gray-800">Update Profile</h4>
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
                    defaultValue={props.user.name}
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
                    defaultValue={props.user.email}
                  />
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
              <div className="items-center gap-1 mt-4 sm:flex mb-8">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-500 rounded-md outline-none 
                  font-semibold ring-offset-2 ring-yellow-500 focus:ring-2"
                    onClick={editUser}
                >
                  Update
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-200 rounded-md outline-none ring-offset-2 ring-gray-500 focus:ring-2 font-semibold"
                  onClick={() => {
                    props.setShowEditProfile(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile