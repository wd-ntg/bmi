import React from 'react'

function Footer() {
  return (
    <div className='text-white bg-black'>
        <div className='w-full bg-gradient-to-r from-green_light_none to-green_light h-[2px]'></div>
        <div className='px-64 py-8 flex flex-col justify-center'>
            <div className='flex justify-center'>
                <div className='hover:text-green_light cursor-pointer text-slate-100'>Trang chủ</div>
                <div className='mx-4 hover:text-green_light cursor-pointer text-slate-100'>Liên hệ</div>
                <div className='hover:text-green_light cursor-pointer text-slate-100'>Trợ giúp</div>
            </div>
            <div className='flex justify-center font-thin text-slate-300 mt-4'>BMI is released under the MIT license.</div>
        </div>
    </div>
  )
}

export default Footer