import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { FaLeaf, FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    isActive ? 'text-green-400 font-bold text-lg' : 'text-white hover:text-green-300';

  return (
    <div>
      {/* Main Navbar */}
      <div className="fixed top-0 z-40 shadow-md backdrop-blur-sm bg-green-800/90 p-4 w-full">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          
          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content backdrop-blur-xl bg-green-800/95 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <NavLink to="/" className="text-white hover:text-green-300 hover:font-bold">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/plants" className="text-white hover:text-green-300 hover:font-bold">Plants</NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink to="/profile" className="text-white hover:text-green-300 hover:font-bold">My Profile</NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="flex items-center text-white hover:text-red-400 hover:font-bold">
                        LogOut <IoIosLogOut />
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Logo */}
          <NavLink className="flex items-center gap-2" to="/">
            <FaLeaf className="text-green-400 text-2xl" />
            <h3 className="text-2xl font-bold text-white">GreenNest</h3>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <ul className="flex gap-8 font-semibold">
              <li>
                <NavLink to="/" className={navLinkClasses}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/plants" className={navLinkClasses}>
                  Plants
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/profile" className={navLinkClasses}>
                    My Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* User Section */}
          <div className="flex gap-4 items-center">
            {loading ? (
              <span className="loading loading-ring loading-md text-white"></span>
            ) : user ? (
              <NavLink to="/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full ring-2 ring-green-400 ring-offset-2 ring-offset-green-800"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-white" />
                )}
              </NavLink>
            ) : null}
            
            {user ? (
              <button
                className="btn hidden sm:block bg-amber-500 hover:bg-amber-600 border-none text-white font-bold"
                onClick={handleLogout}
              >
                LogOut
              </button>
            ) : (
              <NavLink to="/login">
                <button className="btn bg-amber-500 hover:bg-amber-600 border-none text-white font-bold">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
