import React from 'react'

const ThreePoints = () => {
  return (
      <div id='Three points' className='flex relative bottom-1'>
        <button className="text-gray-900 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-9 h-9">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01" />
          </svg>
        </button>
      </div>
  )
}

export default ThreePoints