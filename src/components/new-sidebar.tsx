"use client"

import { useState } from 'react'
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
import { ChevronLeft } from 'lucide-react'

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

    const [isOpen, setIsOpen] = useState(true)
    const path = usePathname()

    return (
        // sidebar
        <div className={`bg-neutral-950 border-neutral-800 h-screen p-6 
            flex flex-col justify-between ${isOpen ? 'w-[16%]' : 'w-[5%]'} ${isOpen ? 'items-start' : 'items-center'} transition-width duration-300`}>
            {/* content */}
            <div className="w-full" >
                {/* header */}
                < div className='items-center flex'
                    style={{
                        justifyContent: isOpen ? 'space-between' : 'center',
                    }}
                >
                    <h1 className='text-2xl text-neutral-200'
                        style={{
                            display: isOpen ? 'flex' : 'none',
                        }}
                    >Organizer</h1>
                    {
                        isOpen ? (
                            <Button variant='ghost' className='border border-neutral-800' size='icon' onClick={() => setIsOpen(false)}>
                                <ChevronLeft className='size-5 cursor-pointer text-neutral-400' size={20} />
                            </Button>
                        ) : (
                            <Button variant='ghost' className='border border-neutral-800' size='icon' onClick={() => setIsOpen(true)}>
                                <ChevronLeft className='size-5 cursor-pointer text-neutral-400 rotate-180' size={20} />
                            </Button>
                        )
                    }
                </div >

                {/* menu */}
                <div className={`mt-8 flex flex-col gap-y-1 w-full`}>
                    <Separator />
                    <SidebarItem title='Dashboard' icon={GaugeIcon} isOpen={isOpen} path={path} url={'/dashboard'} />
                    <Separator />
                    {/* <SidebarTitle category={'main'} /> */}
                    {
                        secondaryNav.map((item, index) => (
                            <SidebarItem key={index} title={item.title} icon={item.icon} path={path} isOpen={isOpen} url={item.url} />
                        ))
                    }
                    <Separator />
                    {/* <SidebarTitle category={'main'} /> */}
                    {
                        mainNav.map((item, index) => (
                            <SidebarItem key={index} title={item.title} icon={item.icon} path={path} isOpen={isOpen} url={item.url} />
                        ))
                    }
                </div >

            </div >
            <div className='w-full flex flex-col items-center gap-y-4'>

                <Buy isOpen={isOpen} />

                <SidebarUser user={{
                    name: session?.user?.name || '',
                    email: session?.user?.email || '',
                    image: session?.user?.image || '',
                    isOpen: isOpen,
                    tier: 'Free'
                }} />
            </div>
        </div >
    )
}