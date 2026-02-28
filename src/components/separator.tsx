import React from 'react'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  color?: 'bg-neutral-800' | 'bg-neutral-700' | 'bg-neutral-600'
}

export default function Separator({ orientation = 'horizontal', color = 'bg-neutral-800' }: SeparatorProps) {
  return (
    <div className={`my-4 ${color} ${orientation === 'vertical' ? 'h-14 w-px' : 'w-full h-px'}`}></div>
  )
}
