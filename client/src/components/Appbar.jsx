import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice.js';
import { BsPlus } from 'react-icons/bs';
import axios from 'axios';

export default function Appbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
          {currentUser ? (
            currentUser.customerType === "User" ? (
              <span 
                onClick={handleSignOut}
                className='bg-indigo-300 border hover:border-indigo-300 hover:bg-white hover:text-indigo-500 px-2 py-1 rounded-full cursor-pointer'>
                Logout
              </span>
            ) : (
              <>
                <Link to ='/create-listing'>
                  <li className='text-gray-200'>
                    <BsPlus className='text-white mr-1 cursor-pointer' size={35} />
                  </li>
                </Link>
                <Link to ={`/view-booked-cars/${currentUser._id}`}>
                  <li className='text-gray-200'>
                    Booked Cars
                  </li>
                </Link>
                <span 
                  onClick={handleSignOut}
                  className='bg-indigo-300 border hover:border-indigo-300 hover:bg-white hover:text-indigo-500 px-2 py-1 rounded-full cursor-pointer'>
                  Logout
                </span>
              </>
            )
          ) : (
            <>
              <Link to='/sign-in'>
                <span className='text-gray-200'>SignIn</span>
              </Link>
              <Link to='/sign-up'>
                <span className='bg-indigo-300 border hover:border-indigo-300 hover:bg-white hover:text-indigo-500 px-2 py-1 rounded-full'>
                  Register here
                </span>
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
