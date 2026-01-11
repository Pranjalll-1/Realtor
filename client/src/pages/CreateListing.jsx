import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
  });
  const { type, name } = formData;

  const onChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <main className="max-w-md mx-auto px-2">
      <h1 className="text-3xl text-center font-bold mt-6">Create a Listing</h1>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell/Rent</p>
        <div className="flex gap-4">
          <button
            id="type"
            value="sale"
            onClick={onChange}
            className={`px-7 py-3 font-medium uppercase text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out cursor-pointer w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            id="type"
            value="rent"
            onClick={onChange}
            className={`px-7 py-3 font-medium uppercase text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out cursor-pointer w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength={32}
          minLength={10}
          className="w-full mb-6 px-6 py-2 text-xl text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out"
        />
      </form>
    </main>
  );
};

export default CreateListing;
