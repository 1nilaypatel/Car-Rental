import { Link, useNavigate } from 'react-router-dom';

export default function Appbar() {

  return (
    <header className='bg-slate-600 shadow-md fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <Link to='/'>
          <h1 className='flex font-bold text-xl sm:text-2xl'>
            <span className='text-slate-50'>Car</span>
            <span className='text-slate-200'>Rental</span>
          </h1>
        </Link>
        <ul className='flex flex-row justify-center items-center gap-4'>
          <Link to='/sign-in'>
            <span className='text-gray-200'>SignIn</span>
          </Link>
          <Link to='/sign-up'>
            <li className='bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500  px-2 py-1 rounded-full'>
              Register here
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
