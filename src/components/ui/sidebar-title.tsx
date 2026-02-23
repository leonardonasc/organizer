import React from 'react'

interface SidebarTitleProps {
    category: string
}
export default function SidebarTitle({ category }: SidebarTitleProps) {
  return (
    <div className="text-xs font-bold text-neutral-400">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
  )
}
