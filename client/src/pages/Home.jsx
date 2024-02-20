import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarListing from '../components/CarListing.jsx';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('/server/listing/get');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }

    fetchCars();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14 p-9">
      {loading ? (
        <p>Loading...</p>
      ) : cars.length === 0 ? (
        <p className='text-3xl text-center text-red-500'>No cars found Agency need to list there cars for rent</p>
      ) : (
        cars.map((car) => <CarListing key={car._id} car={car} />)
      )}
    </div>
  );
}
