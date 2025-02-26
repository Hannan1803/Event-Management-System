import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
 
const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [setPassword, setSetPassword] = useState('');
  const [userRoles, setUserRoles] = useState('organizer');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(''); // New state for password validation
 
  const navigate = useNavigate();
 
  const validatePassword = (password) => {
    const minLength = 6;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
 
    if (password.length < minLength) {
      return "Password must be at least 6 characters.";
    } else if (!hasSymbol) {
      return "Password must contain at least one special character.";
    }
    return "";
  };
 
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setSetPassword(newPassword);
    setPasswordError(validatePassword(newPassword)); // Validate password on change
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // If password is invalid, prevent form submission
    if (passwordError) {
      setErrorMessage("Please fix password errors before submitting.");
      return;
    }
 
    const data = {
      user_name: userName,
      email: userEmail,
      password: setPassword,
      role: userRoles,
    };
 
    try {
const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
 
      const result = await response.json();
      console.log(result);
      
      if (response.ok) {
        alert('User registered successfully!');
        navigate("/login");
      } else {
        setErrorMessage(result.message || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('Error occurred while registering. Please try again.');
    }
  };
 
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-[#D9EAFD]">
      {/* Left Section */}
      <div className="text-center md:w-1/2 mb-6 md:mb-0 m-6">
        <h1 className="text-6xl font-bold text-gray-800">Sign up to get started!</h1>
        <p className='text-lg p-4'>
          Whether you want to organize and manage exciting events or join as an attendee to book tickets and enjoy unforgettable experiences, this is your gateway to being part of something amazing.🚀
        </p>
      </div>
 
      {/* Right Section */}
      <div className="bg-[#F8FAFC] shadow-lg p-6 rounded-lg w-full max-w-md md:w-1/2">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold">Name:*</label>
            <input
              type="text"
              name="userName"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
 
          <div>
            <label className="block text-gray-700 font-semibold">Email:*</label>
            <input
              type="email"
              name="userEmail"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
 
          <div>
            <label className="block text-gray-700 font-semibold">Create Password:*</label>
            <input
              type="password"
              name="setPassword"
              className={`w-full border p-2 rounded-md focus:ring focus:ring-blue-300 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              required
              value={setPassword}
              onChange={handlePasswordChange}
            />
            {/* Password Criteria Message */}
            {passwordError ? (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            ) : (
              <p className="text-gray-600 text-sm mt-1">
                Password must be at least 6 characters and contain at least one special character.
              </p>
            )}
          </div>
 
          <div>
            <label className="block text-gray-700 font-semibold">Select Role:*</label>
            <select
              name="userRoles"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
              required
              value={userRoles}
              onChange={(e) => setUserRoles(e.target.value)}
            >
              <option value="organizer">Organizer</option>
              <option value="attendee">Attendee</option>
            </select>
          </div>
 
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
 
          <button
            type="submit"
            className="relative w-full border border-white rounded-[2%] p-3 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out
                        before:absolute before:inset-0 before:right-0 before:bg-green-300 before:w-0 before:transition-all before:duration-300 before:ease-in-out
                        hover:before:w-full hover:text-black before:z-0 z-10 hover:cursor-pointer hover:shadow-lg"
          >
            <span className="relative z-10 transition-colors duration-0 ease-in-out">Sign Up</span>
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default SignUp;