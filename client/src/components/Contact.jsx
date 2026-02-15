import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contact = ({ listing }) => {
  const [landlordData, setLandlordData] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", listing.userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlordData(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [listing.userRef]);

  function onChange(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  return (
    <>
      {landlordData !== null && (
        <div className="flex flex-col gap-4 w-full">
          <p className=" ">
            Contact <b>{landlordData.name}</b> for the{" "}
            <u>{listing.name.toLowerCase()}</u>
          </p>
          <div>
            <textarea
              className="bg-gray-100 py-2 w-full rounded-md px-2 "
              name="message"
              id="message"
              placeholder="Enter your message"
              rows={2}
              value={message}
              onChange={onChange}
              required
            ></textarea>
          </div>
          <a
            className="bg-blue-600 text-white text-sm px-7 py-3 font-semibold rounded-lg mb-4 text-sm cursor-pointer hover:bg-blue-800 shadow-md hover:shadow-lg w-full text-center transition duration-150 ease-in-out"
            href={`mailto:${landlordData.email}?subject=${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}
          >
            Send Message
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
