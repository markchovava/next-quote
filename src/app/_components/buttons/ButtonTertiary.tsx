"use client"
import React from 'react'

export default function ButtonTertiary(
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
      className={`cursor-pointer text-white ease-in-out duration-300 transition-all bg-indigo-500 hover:bg-indigo-600 rounded-full ${css}`}>
      {title}
    </button>
    </>
  )
}
