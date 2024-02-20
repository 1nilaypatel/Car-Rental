import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      dispatch(signInStart());
      const response = await axios.post('/server/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      if(data.customerType === "User") navigate('/');
      else navigate(`/view-booked-cars/${data._id}`);
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };

  const validateForm = () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.customerType === ""
    ) {
      dispatch(signInFailure("All fields are required."));
      return false;
    }

    dispatch(signInFailure(null));
    return true;
  };

  return (
    <div className="w-64 lg:w-auto lg:max-w-sm mx-auto mt-48 lg:p-2">
      <h1 className='text-center text-xl lg:text-3xl mb-8'>
        Login yourself here
      </h1>
      <div className="flex flex-col gap-5 text-sm lg:text-base">
        <div className="flex flex-col gap-5">
          <input 
            type="email"
            placeholder="workwithnilaypatel@gmail.com"
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
          <select
            id='customerType'
            className='border focus:outline-indigo-300 p-2'
            required
            value={formData.customerType || ''}
            onChange={handleChange}
          >
            <option value='' disabled hidden>Specify Yourself</option>
            <option value='User'>User</option>
            <option value='Agency'>Agency</option>
          </select>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading || error}
          className="p-3 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 disabled:bg-opacity-40"
        >
          {loading ? "Loading..." : "Log in"}
        </button>
      </div>
      {error && <p className='text-red-600 mt-3'>{error}</p>}
    </div>
  )
}
