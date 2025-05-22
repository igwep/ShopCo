import React from 'react'
import Image from 'next/image'

const CategorySection = () => {
  return (
    <div className='min-h-screen md:px-34 3xl:px-64 px-4 py-8'>
      <div className='bg-[#F0F0F0] md:px-8 px-4 py-8 rounded-4xl'>
        <h1 className='md:text-5xl text-3xl text-center w-full font-black uppercase '>Shop by Category</h1>
        <div className='mt-8 space-y-8'>
          {/* First Row */}
          <div className='flex flex-col gap-4 w-full md:flex-row'>
            <a href={`/Shop/beauty`} className='bg-white relative w-full md:w-[45%] h-[289px] flex flex-row-reverse rounded-lg shadow-md overflow-hidden group'>
              <Image
                src="/images/beauty.jpg"
                alt="Beauty"
                width={150}
                height={150}
                className='w-[90%] md:w-full md:h-full object-cover  transform transition-transform duration-300 group-hover:scale-110'
              />
              <h2 className='text-xl md:relative  absolute top-0 left-2 font-semibold mt-2 p-2 z-40'>Beauty</h2>
            </a>
            <a href={`/Shop/fragrances`} className='bg-white relative w-full md:w-[55%] h-[289px] flex flex-row-reverse justify-center md:justify-between rounded-lg shadow-md overflow-hidden group'>
              <Image
                src="/images/fragnance.png"
                alt="Fragnance"
                width={450}
                height={450}
                objectFit="cover"
                className='w-full h-full  transform transition-transform duration-300 group-hover:scale-110'
              />
              <h2 className='text-xl  md:relative  absolute top-0 left-2 font-semibold mt-2 p-2 z-40 '>Fragrances</h2>
            </a>
          </div>
          {/* Second Row */}
          <div className='flex flex-col gap-4 w-full md:flex-row'>
            <a href={`/Shop/furniture`} className='bg-white w-full md:w-[55%] h-[289px] flex flex-row-reverse rounded-lg shadow-md overflow-hidden group'>
              <Image
                src="/images/furniture.avif"
                alt="Furniture"
                width={150}
                height={150}
                className='w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110'
              />
              <h2 className='text-xl font-semibold mt-2 p-2 z-40'>Furnitures</h2>
            </a>
            <a href={`/Shop/groceries`} className='bg-white relative w-full md:w-[45%] h-[289px] flex flex-row-reverse rounded-lg shadow-md overflow-hidden group'>
              <Image
                src="/images/groceries.jpg"
                alt="Groceries"
                width={150}
                height={150}
                className='w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110'
              />
              <h2 className='text-xl font-semibold  md:relative  absolute top-0 left-1 mt-2 p-2 z-40'>Groceries</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySection
