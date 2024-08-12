
import React from 'react'


const Emptycontainer = () => {
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
      
      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center'>
        <h6 className='poppins-medium'>
            Hello <span className='text-[#5776c9]'>!!</span> Here  to baatcheet.
        </h6>
      </div>
    </div>
  )
}

export default Emptycontainer
