import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

interface BreadCrumbsInterface{
    id: number;
    title: string;
    href: string;
}


export default function Breadcrumbs({dbData}: {dbData: BreadCrumbsInterface[]}) {
  return (
    <section className='w-full'>
        <ul className='w-[92%] mx-auto flex items-center justify-start gap-2 text-sm py-2 border-b border-gray-300'>
            {dbData.map((i, key) => (
                <React.Fragment key={key}>
                    <Link href={i.href}>
                        <li className={key === dbData.length - 1 ? 'font-medium' : ''}>{i.title}</li>
                    </Link>
                    {key < dbData.length - 1 && <li><FaAngleRight /></li>}
                </React.Fragment>
            ))}
        </ul>
    </section>
  )
}
