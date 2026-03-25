import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen bg-base-200 py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4'>About Furniture Store</h1>
          <p className='text-xl text-base-content/70'>
            Discover the art of comfortable living
          </p>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          <div className='bg-base-100 p-8 rounded-box shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Our Story</h2>
            <p className='text-base-content/70 leading-relaxed'>
              Founded with a passion for quality and design, Furniture Store has been 
              serving customers for over a decade. We believe that great furniture 
              transforms a house into a home. Our mission is to provide affordable, 
              stylish, and durable furniture for every room and every lifestyle.
            </p>
          </div>

          <div className='bg-base-100 p-8 rounded-box shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Our Mission</h2>
            <p className='text-base-content/70 leading-relaxed'>
              We are committed to offering the finest quality furniture at competitive 
              prices. Our team carefully selects each piece to ensure it meets our high 
              standards for comfort, durability, and style. Customer satisfaction is our 
              top priority.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className='bg-base-100 p-8 rounded-box shadow-md mb-12'>
          <h2 className='text-2xl font-bold mb-6'>Our Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='text-4xl font-bold text-[#f5be91] mb-2'>✓</div>
              <h3 className='font-bold mb-2'>Quality</h3>
              <p className='text-base-content/70'>
                We ensure every piece meets rigorous quality standards
              </p>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-[#f5be91] mb-2'>✓</div>
              <h3 className='font-bold mb-2'>Affordability</h3>
              <p className='text-base-content/70'>
                Great design shouldn't break the bank
              </p>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-[#f5be91] mb-2'>✓</div>
              <h3 className='font-bold mb-2'>Customer Service</h3>
              <p className='text-base-content/70'>
                Your satisfaction is our guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className='bg-linear-to-r from-[#f5be91] to-[#f5a76f] text-white p-8 rounded-box text-center'>
          <h2 className='text-2xl font-bold mb-4'>Get In Touch</h2>
          <p className='mb-6'>Have questions? We'd love to hear from you!</p>
          <div className='space-y-2'>
            <p>📧 Email: info@furniturestore.com</p>
            <p>📞 Phone: (555) 123-4567</p>
            <p>📍 Address: 123 Home Street, Living City, ST 12345</p>
          </div>
        </div>
      </div>
    </div>
  )
}
