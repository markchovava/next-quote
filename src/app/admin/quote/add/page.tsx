import React from 'react'
import Breadcrumbs from '../../_components/Breadcrumbs'
import QuoteAdd from './_components/QuoteAdd'


const CrumbsData = [
  {id: 1, title: "Admin", href: "/admin"},
  {id: 2, title: "Quote", href: "/admin/quote"},
  {id: 3, title: "Add Quote", href: "/admin/quote/add"},
]


export default function page() {
  return (
    <div>
      <Breadcrumbs dbData={CrumbsData} />

      <QuoteAdd />
    </div>
  )
}
