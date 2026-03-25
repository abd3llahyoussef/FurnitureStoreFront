import {useState} from 'react'
import { NavLink } from 'react-router'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../features/userSlice.jsx';

export default function UserContainer() {
  const {user} = useSelector((state) => state.user);
  const [isSignOut, setIsSignOut] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    setIsSignOut(true);
    dispatch(logout());

  };

  const handleLogin = () => {
    setIsSignOut(false);
  }

  return (
    <>
      <div className=" bg-[#f5be91] shadow-sm flex justify-end w-full">
        {user && !isSignOut ? (
          <div className="flex items-center">
            <span className="mr-2">Welcome, {user.findUser.username}</span>
            <NavLink to="/" className="btn btn-ghost" onClick={handleSignOut}>Sign Out</NavLink>
          </div>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-ghost" onClick={handleLogin}>Sign In/Guest</NavLink>
            <NavLink to="/register" className="btn btn-ghost">Create Account</NavLink>
          </>
        )}
      </div>
    </>
  )

          
}
