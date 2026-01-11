import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import CreateListing from "./CreateListing";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    toast.success("Successfully logged out");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
        toast.success("Profile details updated");
      }
    } catch (error) {
      toast.error("Could not update profile details");
      console.error(error);
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-bold mt-6 ">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }))
              }
              className={`w-full mb-6 px-6 py-4 text-xl text-gray-700 ${
                changeDetail ? "bg-red-200 focus:bg-red-200" : "bg-white"
              } border-2 border-gray-300 rounded transition ease-in-out`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full mb-6 px-6 py-4 text-xl text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out "
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={async () => {
                    await (changeDetail && onSubmit());
                    setChangeDetail(!changeDetail);
                  }}
                  className="cursor-pointer text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"
                >
                  {changeDetail ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white uppercase px-7 py3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center py-3"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />{" "}
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
