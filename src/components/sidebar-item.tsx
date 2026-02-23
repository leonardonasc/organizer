import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'

interface SidebarItemProps {
    title: string
    icon?: React.ElementType
    url?: string
    isOpen: boolean
}

export default function SidebarItem({ title, icon: Icon, url, isOpen }: SidebarItemProps) {
    return (
        <Button variant={'ghost'} className="w-full text-md flex items-center justify-start"
            onClick={() => {
                url && redirect(url)
            }}
        >
            <div className="flex items-center gap-x-3 p-2 cursor-pointer rounded-lg">
                {Icon && <Icon className={`${isOpen ? 'hover:text-purple-300' : ''}`} size={20} />}
                {isOpen && <span className="text-sm text-neutral-200">{title}</span>}
            </div>
        </Button>
    )
}
