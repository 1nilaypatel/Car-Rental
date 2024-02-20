import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className='flex flex-row gap-10 items-center justify-center h-screen'>
      <Link to='/user-sign-up'>
        <button 
          className="py-4 px-6 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 disabled:bg-opacity-40"
        >
          Register as User
        </button>
      </Link>
      <Link to='/agency-sign-up'>
        <button 
          className="py-4 px-6 bg-indigo-300 border hover:border-indigo-300 hover:bg-white  hover:text-indigo-500 disabled:bg-opacity-40"
        >
          Register as Agency
        </button>
      </Link>
    </div>
  )
}
