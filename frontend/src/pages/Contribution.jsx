import React, { useState } from "react";
import axios from "axios";

const Contribution = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    materialType: "",
    quantity: "",
    location: "",
    description: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value)
    );

    try {
      const res = await axios.post("http://localhost:5000/api/contributions", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Contribution submitted successfully!");
      setFormData({
        name: "",
        email: "",
        materialType: "",
        quantity: "",
        location: "",
        description: "",
        image: null,
      });
    } catch (error) {
      setMessage("Failed to submit contribution. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10 px-4">
      {/* Top static step boxes */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        <div className="bg-green-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg text-center w-64">
          <span className="text-2xl font-bold">1.</span> Submit Details
        </div>
        <div className="bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-2xl shadow-lg text-center w-64">
          <span className="text-2xl font-bold">2.</span> Get Connected
        </div>
        <div className="bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-2xl shadow-lg text-center w-64">
          <span className="text-2xl font-bold">3.</span> Make an Impact
        </div>
      </div>

      {/* Contribution form card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Contribute Recyclable Materials
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Material Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
            <input
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="e.g., Plastic, Paper, Metal"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="e.g., 5kg, 10 items"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="City / Area"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              rows="3"
              placeholder="Tell us more about your recyclable materials"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Submit Contribution
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-green-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Contribution;
