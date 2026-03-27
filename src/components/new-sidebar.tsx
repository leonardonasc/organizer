"use client"

import { useEffect, useState } from 'react'
import SidebarItem from './sidebar-item'
import { GaugeIcon } from './ui/gauge'
import SidebarUser from './sidebar-user'
import { useSession } from 'next-auth/react'
import Buy from './buy'
import Separator from './separator'
import { CircleDollarSignIcon } from './ui/circle-dollar-sign'
import { HeartIcon } from './ui/heart'
import { FileTextIcon } from './ui/file-text'
import { AirplaneIcon } from './ui/airplane'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Menu, SquareCheck, X } from 'lucide-react'
import { useMe } from '@/hooks/use-me'

export default function NewSidebar() {

    const { me, loading } = useMe();

    const secondaryNav = [
        {
            title: 'Wishlists',
            icon: HeartIcon,
            url: '/wishlists'
        },
        {
            title: 'Travels',
            icon: AirplaneIcon,
            url: '/travels'
        },
        {
            title: 'Annotations',
            icon: FileTextIcon,
            url: '/annotations'
        },
        {
            title: 'Expenses',
            icon: CircleDollarSignIcon,
            url: '/expenses'
        },
        {
            title: 'Todo / Temp Page',
            icon: SquareCheck,
            url: '/todo'
        }
    ]

    const [isOpen, setIsOpen] = useState(false)
    const path = usePathname()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])


    return (
        // sidebar
        <div
            className={`
                flex flex-col 
                p-3 
                w-full md:border-r md:border-b-0 md:border-r-neutral-800 md:items-center md:w-20 py-2
                ${isOpen ?
                    'fixed top-0 bg-neutral-950 left-0 inset-0 z-50 h-dvh overflow-y-auto overscroll-contain items-start md:static md:inset-auto md:left-auto md:top-auto md:h-auto md:z-auto md:w-75' : 'bg-neutral-900'}
            `}>

            {/* header */}
            <div className={`flex justify-between ${isOpen ? 'md:justify-between' : 'md:justify-center'} items-center w-full`}>
                <div className="flex flex-col items-center">
                    <h1 className={`md:${isOpen ? 'block' : 'hidden'}`}>Organizer</h1>
                </div>
                <Button variant={'ghost'} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    {isOpen ? <X /> : <Menu size={20} />}
                </Button>
            </div>
            <div className={`w-full ${isOpen ? 'hidden' : 'block md:hidden'}`}>
                <Separator />
            </div>

            {/* conteúdo */}
            <div className={`flex flex-col h-full justify-between ${isOpen ? 'block w-full p-2' : 'hidden'} md:flex`}>
                <div className="border-neutral-800">
                    <Separator />
                    <SidebarItem title={'Dashboard'} icon={GaugeIcon} url={'/dashboard'} isOpen={isOpen} path={path} />
                    <Separator />
                    <div className="flex flex-col gap-y-1">
                        {secondaryNav.map((item) => (
                            <SidebarItem key={item.title} title={item.title} icon={item.icon} url={item.url} isOpen={isOpen} path={path} />
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-y-3'>
                    {/* <Buy isOpen={isOpen} /> */}
                    <SidebarUser user={{
                        name: me?.name || 'User',
                        image: me?.image || undefined,
                        email: me?.email || '',
                        isOpen: isOpen,
                        tier: me?.tier || 'Free'
                    }} />
                </div>
            </div>

        </div>
    )
}