import React from 'react'
import Breadcrumbs from '../_components/Breadcrumbs';

const CrumbsData = [
  {id: 1, title: "Admin", href: "/admin"},
  {id: 2, title: "Quote", href: "/admin/quote"},
]

export default function page() {
  return (
    <>
    <Breadcrumbs dbData={CrumbsData} />
    </>
  )
}
