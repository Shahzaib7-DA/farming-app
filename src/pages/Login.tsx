import React, { useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const keralaDistricts = [
  "Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam",
  "Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta",
  "Thiruvananthapuram","Thrissur","Wayanad"
];


const cropList = [
  "Paddy", "Wheat", "Maize", "Sugarcane", "Cotton", "Tea", "Coffee", "Rubber", "Banana", "Coconut",
  "Pepper", "Cardamom", "Arecanut", "Tobacco", "Groundnut", "Soybean", "Mustard", "Barley", "Jute", "Sunflower"
];

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    crop: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage as farmerProfile
    const farmerProfile = {
      id: Date.now().toString(),
      name: formData.name,
      district: formData.district,
      phone: formData.phone,
      crop: formData.crop,
      registeredAt: new Date(),
    };
    localStorage.setItem("farmerProfile", JSON.stringify(farmerProfile));
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-green-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Farmer Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border border-green-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
            <FaUser className="text-green-600 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Farmer Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          {/* Phone */}
          <div className="flex items-center border border-green-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
            <FaPhone className="text-green-600 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          {/* District Dropdown */}
          <div className="flex items-center border border-green-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full outline-none text-gray-700 bg-white cursor-pointer"
              required
            >
              <option value="" disabled>Select District</option>
              {keralaDistricts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          {/* Crop Dropdown */}
          <div className="flex items-center border border-green-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className="w-full outline-none text-gray-700 bg-white cursor-pointer"
              required
            >
              <option value="" disabled>Select Crop</option>
              {cropList.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
