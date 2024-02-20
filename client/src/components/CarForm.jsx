import React from 'react';

export default function CarForm({ formData, handleChange, handleSubmit, uploading }) {
  return(
    <form onSubmit={handleSubmit} className='flex flex-col gap-7 mt-16 max-w-96 mx-auto'>
      <div className='flex flex-col flex-1 gap-5'>
        <input
          type="text"
          placeholder="Vehical Model"
          className="border rounded-lg p-3 focus:outline-indigo-400"
          id="vehicalModel"
          required
          onChange={handleChange}
          value={formData.vehicalModel}
        />
        <input
          type="text"
          placeholder="Vehical Number"
          className="border rounded-lg p-3 focus:outline-indigo-400"
          id="vehicalNumber"
          required
          onChange={handleChange}
          value={formData.vehicalNumber}
        />
        <div className='flex flex-row gap-5'>
          <input
            type="number"
            placeholder="Seating Capacity"
            className="border rounded-lg p-3 focus:outline-indigo-400 w-1/2"
            id="seatingCapacity"
            required
            onChange={handleChange}
            value={formData.seatingCapacity}
          />
          <input
            type="number"
            placeholder="Rent / Day"
            className="border rounded-lg p-3 focus:outline-indigo-400 w-1/2"
            id="rentPerDay"
            required
            onChange={handleChange}
            value={formData.rentPerDay}
          />
        </div>
      </div>
    </form>
  )
}