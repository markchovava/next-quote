"use client"
import ButtonPrimary from '@/app/_components/buttons/ButtonPrimary'
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
            <ButtonPrimary title="Add Quote"  css='py-2 px-4' onClick={() => {}} />
          </Link>
          
        </div>
    </section>
    </>
  )
}
