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
    <div className='mt-14'>
      <h1>Booked Cars</h1>
      <ul>
        {bookedCars.map((car) => (
          <li key={car._id}>
            <p>Vehicle Model: {car.vehicalModel}</p>
            <p>Vehicle Number: {car.vehicalNumber}</p>
            <p>Seating Capacity: {car.seatingCapacity}</p>
            <p>Rent Per Day: {car.rentPerDay}</p>
            <p>User: {car.rentUserName}</p>
            <p>Email: {car.rentUserEmail}</p>
            <p>Phone: {car.rentUserPhone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
