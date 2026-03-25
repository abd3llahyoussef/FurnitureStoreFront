import React from 'react'
import { useSelector } from 'react-redux'
import Carousel from './Carousel';

export default function Home() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='grid grid-cols-2 max-lg:grid-cols-1 h-[80vh] bg-base-200'>
      <div className='hero bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold mb-5'>Welcome to Furniture Store</h1>
            <p className='text-xl mb-4'>
              {user ? `Welcome back, ${user.findUser?.username || 'User'}!` : 'Browse our beautiful collection of furniture'}
            </p>
            <button className='btn bg-[#f5be91] border-0'>Shop Now</button>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 max-lg:hidden">
        <Carousel/>
        </div>
    </div>
  )
}
