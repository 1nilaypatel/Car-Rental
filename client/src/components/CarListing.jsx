import { Link } from 'react-router-dom';
import axios from 'axios';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function CarListing({ car }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const defaultFormData = {
    vehicalModel: car.vehicalModel,
    vehicalNumber: car.vehicalNumber,
    seatingCapacity: car.seatingCapacity,
    rentPerDay: car.rentPerDay,
    numberOfDaysNeed: 1,
    capturedStartDate: new Date().toISOString().split('T')[0],
    booked: "Yes",
    userRef: car.userRef,
    agency: car.username,
  };

  const [formData, setFormData] = useState(currentUser ? {
    ...defaultFormData,
    rentUserName: currentUser.username,
    rentUserEmail: currentUser.email,
    rentUserPhone: currentUser.phone,
  } : defaultFormData);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await axios.post('/server/auth/signout');
      const data = response.data;
      if (response.data.success === false) {
        dispatch(signOutUserFailure(response.data.message));
        return;
      }
      dispatch(signOutUserSuccess(response.data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleRent = async () => {
    try {
      const response = await axios.post(`/server/listing/rent/${car._id}`, formData);
      handleSignOut();
      alert("Car rented successfully!");
      window.location.reload(true);
    } catch (error) {
      console.error("Error renting car:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <img
        src={"https://zoomcar-assets.zoomcar.com/25581/HostCarImage/host_car_image_25581a9f56464-c1f7-4a24-93e0-702f015ff6d7.jpg20230109-32-1bqlw7w"}
        alt='Car cover'
        className='h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-2xl font-semibold text-slate-700'>
          {car.vehicalModel}
        </p>
        <div className='flex flex-row gap-4 items-center'>
          <p className='text-sm '>
            by
            <span className='ml-1 text-base font-thin'>{car.agency}</span>
          </p>
          <p className='text-sm'>
            {car.vehicalNumber}
          </p>
          <p className='text-sm text-gray-600'>
            {car.seatingCapacity} Seats
          </p>
        </div>
        <p className='text-slate-800 text-lg font-semibold'>
          ₹{car.rentPerDay} / day
        </p>
        {currentUser ? (
          currentUser.customerType === "User" ? (
            <>
              <select id="numberOfDaysNeed" value={formData.numberOfDaysNeed} onChange={handleChange} className="focus:outline-none">
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={6}>{">="} 6 Days</option>
              </select>
              <input type="date" id="capturedStartDate" value={formData.capturedStartDate} onChange={handleChange} className="focus:outline-none" />
              <button 
                onClick={handleRent}
                className="text-lg p-3 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500"
              >
                Rent Car
              </button>
            </>
          ) : (
            <>
              <Link to={`/update-listing/${car._id}`}>
                <button 
                  className="text-lg p-3 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 w-full"
                >
                  Rent Car
                </button>
              </Link>
            </>
          )
        ) : (
          <>
            <Link to='/user-sign-up'>
              <button 
                className="text-lg p-3 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 w-full"
              >
                Rent Car
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

