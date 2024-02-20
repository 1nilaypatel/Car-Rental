import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CarForm from '../components/CarForm.jsx';
import { useSelector } from 'react-redux';

export default function UpdateListing() {
  const { listingId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/server/listing/get/${listingId}`);
        const data = response.data;
        setFormData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching listing details");
        setLoading(false);
      }
    };

    fetchListing();
  }, []);

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
      setError(false);
      const response = await axios.put(`/server/listing/update/${listingId}`, formData);
      setLoading(false);
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      setError(error.response.data.message);
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
        Update Car Details
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
          {loading ? "Updating..." : "Update"}
        </button>
        {error && <p className='text-red-500 text-sm mt-3'>{error}</p> }
      </div>
    </main>
  )
}
