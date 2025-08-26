import Link from 'next/link'
import React from 'react'

export default function AdminHeader() {
  return (
    <>
    <section className='w-full border-b-[6px] border-sky-500'>
        <div className="mx-auto w-[92%] flex justify-between items-center gap-4 pt-2 pb-3">
            <h2 className='text-[2rem] font-extrabold leading-tight'>
                Quote System
            </h2>

           
            <Link href="/admin/quote/add">
            <button className='cursor-pointer text-lg text-white ease-in-out duration-300 transition-all bg-cyan-400 hover:bg-cyan-500 rounded-full py-2 px-4'>
                Quote
            </button>
            </Link>
          
        </div>
    </section>
    </>
  )
}
