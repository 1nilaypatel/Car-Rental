import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CarForm from '../components/CarForm.jsx';
import { useSelector } from 'react-redux';

export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicalModel: "",
    vehicalNumber: "",
    seatingCapacity: "",
    rentPerDay: "",
    userRef: currentUser._id,
    agency: currentUser.username,
  });

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
    try{
      setLoading(true);
      setError(false);
      const response = await axios.post("/server/listing/create", formData);
      setLoading(false);
      if(response.data.success === false){
        setError(response.data.message);
      } else {
        navigate(`/`);
      }
    } catch(error){
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (
      formData.vehicalModel === "" ||
      formData.vehicalNumber === "" ||
      formData.seatingCapacity === "" ||
      formData.rentPerDay === ""
    ) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  return (
    <main className="p-3 max-w-5xl mx-auto mt-14 text-slate-800">
      <h1 className='text-3xl font-semibold text-center mb-8 mt-6'>
        Enter your Car Details
      </h1>
      <CarForm
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
      />
      <div className='mt-10 text-center'>
        <button 
          onClick={handleSubmit}
          disabled={loading} 
          className="p-3 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 disabled:bg-opacity-40"
        >
          {loading ? "Adding..." : "Add Car"}
        </button>
        {error && <p className='text-red-500 text-sm mt-3'>{error}</p> }
      </div>
    </main>
  )
}
