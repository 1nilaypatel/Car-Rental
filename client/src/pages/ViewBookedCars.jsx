import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewBookedCars() {
  const { agencyId } = useParams();
  const [bookedCars, setBookedCars] = useState([]);

  useEffect(() => {
    const fetchBookedCars = async () => {
      try {
        const response = await axios.get(`/server/user/listings/${agencyId}`);
        setBookedCars(response.data);
      } catch (error) {
        console.error("Error fetching booked cars:", error);
      }
    };
    fetchBookedCars();
  }, [agencyId]);

  return (
    <div className='mt-24'>
      <h1 className='text-4xl text-center mb-10'>Booked Cars</h1>
      <ul>
        {bookedCars.map((car) => (
          <li key={car._id}>
            <div className="bg-slate-300 flex flex-row py-5 px-8 justify-self-center gap-6">
              <div className='flex flex-col'>
                <p>Vehicle Model: {car.vehicalModel}</p>
                <p>Vehicle Number: {car.vehicalNumber}</p>
                <p>Seating Capacity: {car.seatingCapacity}</p>
                <p>Rent Per Day: {car.rentPerDay}</p>
              </div>
              <div className='flex flex-col'>
                <p>User: {car.rentUserName}</p>
                <p>Email: {car.rentUserEmail}</p>
                <p>Phone: {car.rentUserPhone}</p>
              </div>
            </div>
            <hr className='border-b-0 mt-2' />
          </li>
        ))}
      </ul>
    </div>
  );
}
