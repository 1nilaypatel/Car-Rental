import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgencySignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/server/auth/agencySignup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const validateForm = () => {
    if (
      formData.username === "" ||
      formData.phone === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setError("All fields are required.");
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <div className="w-64 lg:w-auto lg:max-w-sm mx-auto mt-48 lg:p-2">
      <h1 className='text-center text-xl lg:text-3xl mb-8'>
        Agency Registration Form
      </h1>
      <div className="flex flex-col gap-5 text-sm lg:text-base">
        <div className="flex flex-col gap-5">
          <input 
            type="text"
            placeholder="Uber Patel"
            id="username"
            className="border focus:outline-indigo-300  p-2"
            required
            onChange={handleChange}
          />
          <input 
            type="email"
            placeholder="uberpatel@gmail.com"
            id="email"
            className="border focus:outline-indigo-300 p-2"
            required
            onChange={handleChange}
          />
          <input 
            type="password"
            placeholder="password"
            id="password"
            className="border focus:outline-indigo-300 p-2"
            required
            onChange={handleChange}
          />
          <input 
            type="number"
            placeholder="992331763"
            id="phone"
            className="border focus:outline-indigo-300 p-2"
            required
            onChange={handleChange}
          />
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading || error}
          className="p-3 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 disabled:bg-opacity-40"
        >
          {loading ? "Loading..." : "Register my Agency"}
        </button>
      </div>
      {error && <p className='text-red-600 mt-3'>{error}</p>}
    </div>
  )
}
