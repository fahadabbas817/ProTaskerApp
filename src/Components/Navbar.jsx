import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='flex justify-between bg-purple-900 text-white py-2'>
        <div className="logo"><span className='font-bold text-xl mx-5'>ProTasker</span></div>
        <ul className="flex gap-8 mx-16">
            <li className='cursor-pointer  hover:text-yellow-400 hover:font-bold transition-all duration-350'>Home</li>
            <li className='cursor-pointer   hover:text-yellow-400 hover:font-bold transition-all duration-150'>Tasks</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar