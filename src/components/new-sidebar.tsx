"use client"

import { useState } from 'react'
import SidebarItem from './sidebar-item'
import { MenuIcon } from './ui/menu'
import { GaugeIcon } from './ui/gauge'
import { PanelLeftOpenIcon } from './ui/panel-left-open'
import { PanelRightOpenIcon } from './ui/panel-right-open'
import SidebarTitle from './ui/sidebar-title'
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
import { ChevronRightIcon } from './ui/chevron-right'
import { ChevronLeftIcon } from './ui/chevron-left'
import { FlaskIcon } from './ui/flask'
import { usePathname } from 'next/navigation'

export default function NewSidebar() {

    const { data: session } = useSession();


    const mainAppMock = [
        {
            title: 'Wishlist',
            icon: HeartIcon
        },
        {
            title: 'Travels',
            icon: AirplaneIcon
        },
        {
            title: 'Annotations',
            icon: FileTextIcon
        },
        {
            title: 'Expenses',
            icon: CircleDollarSignIcon
        },
    ]

    const dataMock = [
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
        <div className='bg-neutral-950 h-screen p-6 border-neutral-800'
            style={{
                width: isOpen ? '15%' : '5%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: isOpen ? 'flex-start' : 'center',
                transition: 'width 0.3s'
            }}
        >
            {/* content */}
            <div className="w-full">
                {/* header */}
                <div className='items-center flex'
                    style={{
                        justifyContent: isOpen ? 'space-between' : 'center',
                    }}
                >
                    <h1 className='text-2xl text-neutral-200'
                        style={{
                            display: isOpen ? 'flex' : 'none',
                        }}
                    >Organizer</h1>
                    {isOpen ? (
                        <ChevronLeftIcon className='size-6 cursor-pointer text-neutral-400' size={20} onClick={() => setIsOpen(false)} />
                    ) : (
                        <ChevronRightIcon className='size-6 cursor-pointer text-neutral-400' size={20} onClick={() => setIsOpen(true)} />
                    )}
                </div>

                {/* menu */}
                <div className={`mt-8 flex flex-col gap-y-1 w-full`}>
                    <Separator />
                    <SidebarItem title='Dashboard' icon={GaugeIcon} isOpen={isOpen} path={path} url={'/dashboard'} />
                    <Separator />
                    {/* <SidebarTitle category={'main'} /> */}
                    {dataMock.map((item, index) => (
                        <SidebarItem key={index} title={item.title} icon={item.icon} url={item.url} path={path} isOpen={isOpen} />
                    ))}
                    <Separator />
                    {/* <SidebarTitle category={'main'} /> */}
                    {mainAppMock.map((item, index) => (
                        <SidebarItem key={index} title={item.title} icon={item.icon} path={path} isOpen={isOpen} />
                    ))}
                </div>

            </div>
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
        </div>
    )
}