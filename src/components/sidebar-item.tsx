import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'

interface SidebarItemProps {
    title: string
    icon?: React.ElementType
    url?: string
    isOpen: boolean
    path: string
}

export default function SidebarItem({ title, icon: Icon, url, isOpen, path }: SidebarItemProps) {
    return (
        <Button variant={path === url ? 'outline' : 'ghost'} className={`w-full text-md flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}
            onClick={() => {
                url && redirect(url)
            }}
        >
            <div className={`flex w-full items-center ${isOpen ? 'gap-x-3 p-2' : ''} ${path === url ? 'text-neutral-200' : 'text-neutral-400'} cursor-pointer rounded-lg`} >
                {Icon && <Icon size={20} />}
                {isOpen && <span className="text-sm">{title}</span>}
            </div>
        </Button>
    )
}
