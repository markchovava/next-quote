"use client"
import React from 'react'

export default function ButtonSecondary(
    {
        title, 
        onClick, 
        css
    }: {
        title: string, 
        onClick: () => void,
        css?: string,
    }
) {
  return (
    <>
    <button 
        onClick={onClick} 
        className={`cursor-pointer text-white ease-in-out duration-300 transition-all bg-green-500 hover:bg-green-600 rounded-full ${css}`}>
        {title}
    </button>
    </>
  )
}
