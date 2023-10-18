import DataContext from '../context/DataContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { current: user, logout } = useContext(DataContext);
  return (
    <div className="flex justify-around items-center h-[10vh] w-full bg-[#150E28]">
      <Link to="/"><h1 className="font-bold font-roboto text-white text-xs md:text-xl">Idea tracker</h1></Link>
        <nav className='flex gap-x-4 items-center justify-around'>
          
          <div>
            {user ? (
              <div className='flex gap-x-4 items-center justify-around'>
                <span className='font-semibold font-roboto text-white text-xs md:text-xl'>{user.email}</span>
                <button type="button" onClick={() => logout()}
                className='px-4 py-2 text-xs md:text-xl font-roboto text-white rounded-lg bg-red-400 font-semibold'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login"><p className='px-4 py-2 text-xs md:text-xl font-roboto text-white rounded-lg font-semibold'>Login</p></Link>
            )}
          </div>
        </nav>
    </div>
  )
}

export default Header