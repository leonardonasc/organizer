"use client"

import { useEffect, useState } from 'react'
import SidebarItem from './sidebar-item'
import { GaugeIcon } from './ui/gauge'
import SidebarUser from './sidebar-user'
import { useSession } from 'next-auth/react'
import { CogIcon } from './ui/cog'
import { UserIcon } from './ui/user'
import Buy from './buy'
import Separator from './separator'
import { CircleDollarSignIcon } from './ui/circle-dollar-sign'
import { HeartIcon } from './ui/heart'
import { FileTextIcon } from './ui/file-text'
import { AirplaneIcon } from './ui/airplane'
import { CartIcon } from './ui/cart'
import { FlaskIcon } from './ui/flask'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronLeft, Grip, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewSidebar() {

    const { data: session } = useSession();

    const secondaryNav = [
        {
            title: 'Wishlist',
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
    ]

    const mainNav = [
        {
            title: 'Profile',
            icon: UserIcon
        },
        {
            title: 'Settings',
            icon: CogIcon
        },
        {
            title: 'Billing',
            icon: CartIcon
        },
        {
            title: 'Tests',
            icon: FlaskIcon,
            url: '/tests'
        }

    ]


    const [isOpen, setIsOpen] = useState(false)
    const path = usePathname()

    return (
        // sidebar
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`flex flex-col p-3 w-full 2xl:items-center 2xl:w-25 py-5
        ${isOpen ? 'fixed top-0 left-0 h-screen inset-0 z-50 items-start bg-neutral-950 2xl:static 2xl:inset-auto 2xl:left-auto 2xl:top-auto 2xl:h-auto 2xl:z-auto 2xl:w-75' : ''}
        `}>
            {/* header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`flex justify-between 2xl:${isOpen ? 'justify-between' : 'justify-center'} w-full`}>
                <h1 className={`2xl:${isOpen ? 'block' : 'hidden'}`}>Organizer</h1>
                <Button variant={'outline'} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    {isOpen ? <X /> : <Grip />}
                </Button>
            </motion.div>

            {/* conteúdo */}

            <div className={`flex flex-col h-full justify-between ${isOpen ? 'block w-full' : 'hidden'} 2xl:flex`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="border-neutral-800">
                    <Separator />
                    <SidebarItem title={'Dashboard'} icon={GaugeIcon} url={'/dashboard'} isOpen={isOpen} path={path} />
                    <Separator />
                    <div className="flex flex-col gap-y-1">
                        {mainNav.map((item) => (
                            <SidebarItem key={item.title} title={item.title} icon={item.icon} url={item.url} isOpen={isOpen} path={path} />
                        ))}
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-y-1">
                        {secondaryNav.map((item) => (
                            <SidebarItem key={item.title} title={item.title} icon={item.icon} url={item.url} isOpen={isOpen} path={path} />
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className='flex flex-col gap-y-3'>
                        <Buy isOpen={isOpen} />
                    <SidebarUser user={{
                        name: session?.user?.name || 'User',
                        email: session?.user?.email || '',
                        image: session?.user?.image || '',
                        isOpen: isOpen,
                        tier: 'Pro'
                    }} />
                </motion.div>
            </div>

        </motion.div>
    )
}