import React from 'react'

interface SidebarTitleProps {
    category: string
}
export default function SidebarTitle({ category }: SidebarTitleProps) {
  return (
    <div className="text-sm font-normal ml-1 text-neutral-400">{category.toLowerCase()}</div>
  )
}
