import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch logged-in user's name from local storage when component mounts
  const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess('User Loggedout')
    setTimeout(() => {
      navigate("/login");
    }, 1400);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">Hello, {loggedInUser}</h1>
      <p className="profile-subheader">Welcome to your profile!</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <form className="profile-form-group">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="profile-form-group">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="profile-form-group">
          <label className="form-label">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-select choose"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="profile-form-group">
          <label className="form-label">LinkedIn:</label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="LinkedIn Profile Link"
            className="form-input"
          />
        </div>

        <div className="profile-form-group">
          <label className="form-label">Profile Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-input-file"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="image-preview"
            />
          )}
        </div>

        <button type="submit" className="form-button">
          Save Profile
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
