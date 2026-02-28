import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'

interface SidebarItemProps {
    title: string
    icon?: React.ElementType
    url?: string
    isOpen: boolean
    path: string
}

export default function SidebarItem({ title, icon: Icon, url, isOpen, path }: SidebarItemProps) {
    return (
        <Button variant={path === url ? 'outline' : 'ghost'} className={` text-md flex items-center w-full ${isOpen ? 'justify-start' : 'justify-center'}`}
            onClick={() => {
                url && redirect(url)
            }}
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex  items-center ${isOpen ? 'gap-x-3 p-2' : ''} ${path === url ? 'text-neutral-200' : 'text-neutral-400'} cursor-pointer rounded-lg`} >
                {Icon && <Icon size={20} />}
                {isOpen && <span>{title}</span>}
            </motion.div>
        </Button >
    )
}
