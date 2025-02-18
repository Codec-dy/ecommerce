import React, { useState } from 'react'

const Filters = ({heading,f1,f2,f3, showFilter,toggleCategory}) => {
   
  return (
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>{heading}</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={f1} onChange={toggleCategory}/> {f1}
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={f2} onChange={toggleCategory}/> {f2}
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={f3} onChange={toggleCategory}/> {f3}
            </p>
          </div>
        </div>
  )
}

export default Filters