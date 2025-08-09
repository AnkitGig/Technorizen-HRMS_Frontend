import React, { useState, useEffect } from "react";
import {
  getProfile as fetchProfile,
  updateProfile as saveProfile,
} from "../api/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    designation: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const getProfile = async () => {
    setLoading(true);
    setMessage("");
    try {
      // Optionally get token from localStorage or context if needed
      const token = localStorage.getItem("token");
      const data = await fetchProfile(token);
      setProfile({
        fullName: data.fullName || "",
        designation: data.designation || "",
        email: data.email || "",
        mobile: data.mobile || "",
        dob: data.dob ? data.dob.slice(0, 10) : "",
        address: data.address || "",
      });
      setMessage("Profile loaded");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Optionally get token from localStorage or context if needed
      const token = localStorage.getItem("token");
      await saveProfile(profile, token);
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-white py-8 px-2 gap-6">
      {/* Left Sidebar */}
    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md mx-auto border border-blue-100 flex flex-col items-center text-center transition-transform hover:scale-[1.02] duration-300">
  {/* Avatar */}
  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 shadow-xl border-4 border-white flex items-center justify-center mb-4">
    {/* Avatar letter */}
    <span className="text-5xl text-white font-extrabold">
      {profile.fullName ? profile.fullName[0] : "U"}
    </span>
  </div>

  {/* Name & Designation */}
  <h2 className="text-2xl font-bold text-gray-800">
    {profile.fullName || "Kakashi Hatake"}
  </h2>
  <span className="text-sm bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium mt-2 mb-6 inline-block">
    {profile.designation || "UI/UX Designer"}
  </span>

  {/* Basic Info Section */}
  <div className="w-full text-left">
    <h3 className="text-md font-semibold text-gray-700 mb-4">📋 Basic Information</h3>
    <ul className="space-y-4 text-sm">
      {[
        { label: "📧 Email", value: profile.email || "kakashi@gmail.com" },
        { label: "📞 Phone", value: profile.mobile || "+91 9876543210" },
        { label: "📍 Location", value: "Singapore" },
        { label: "👤 Gender", value: "Male" },
        { label: "🎂 Age", value: "27" },
        { label: "💼 Work Status", value: "Active" },
        { label: "⏰ Work Type", value: "Full Time" },
      ].map(({ label, value }) => (
        <li key={label} className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600 font-medium">{label}</span>
          <span className="text-gray-800 font-semibold">{value}</span>
        </li>
      ))}
    </ul>
  </div>
</div>


      {/* Right Main Content */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full md:w-[600px] border border-blue-100 relative overflow-hidden flex flex-col justify-between md:min-h-[600px]">
        <div className="flex flex-col sm:flex-row items-center mb-8 gap-4 sm:gap-8">
          <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 shadow-lg border-4 border-white">
            <span className="text-4xl text-white font-bold">
              {profile.fullName ? profile.fullName[0] : "U"}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">
              Personal Information
            </h2>
            <p className="text-gray-500 text-base">
              Manage your personal information
            </p>
          </div>
        </div>
        <button
          className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-md transition hover:from-blue-600 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed z-10"
          onClick={getProfile}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
        <form onSubmit={updateProfile} className="flex flex-col gap-6 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={profile.designation}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-lg py-3 text-lg font-bold mt-2 shadow-lg transition hover:from-blue-700 hover:to-teal-500 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        {message && (
          <p className="mt-8 text-green-600 font-semibold text-center animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
