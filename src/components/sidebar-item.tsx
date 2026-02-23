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
            <div className={`flex w-full items-center ${isOpen ? 'gap-x-3 p-2' : ''} cursor-pointer rounded-lg`} >
                {Icon && <Icon className={'hover:text-purple-300'} size={20} />}
                {isOpen && <span className="text-sm text-neutral-200">{title}</span>}
            </div>
        </Button>
    )
}
