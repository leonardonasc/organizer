'use client'

import { ArrowLeftToLine, ArrowRightFromLine, GaugeIcon, Heart, PlaneIcon } from 'lucide-react'
import { useIsMobile } from '../hooks/use-mobile'
import { motion } from 'framer-motion'
import { Button } from './ui/button';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMe } from '@/hooks/use-me';
import SidebarUser from './sidebar-user';
import { MenuIcon } from './ui/menu';

export default function Nav() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { me, loading } = useMe();

    const navItems = [
        {
            title: 'Dashboard',
            icon: GaugeIcon,
            url: '/dashboard',
        },
        {
            title: 'Travel',
            icon: PlaneIcon,
            url: '/travels',
        },
        {
            title: 'Wishlists',
            icon: Heart,
            url: '/wishlists',
        }
    ];

    return (
        <div className={`w-full h-15 md:h-full ${isOpen ? 'md:w-60' : 'md:w-[5%] flex justify-center'} bg-accent p-4`}>
            {
                isMobile ? (
                    // TODO: fazer a nav mobile
                    <div className='flex justify-between w-full'>
                        <h1 className='text-2xl font-bold'>Aeryn</h1>
                        <Button variant='outline' size='icon' className='mb-6'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MenuIcon />
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='w-full flex flex-col justify-between h-full'>
                        <div className='w-full'>
                            <div className={`flex ${isOpen ? 'justify-between' : 'justify-center'} w-full`}>
                                <h1 className={`text-2xl font-bold ${isOpen ? 'block' : 'hidden'} `}>Aeryn</h1>
                                <Button variant='outline' size='icon' className='mb-6'
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {isOpen ? (
                                        <ArrowLeftToLine />
                                    ) : (
                                        <ArrowRightFromLine />
                                    )}
                                </Button>
                            </div>
                            <div className={`flex flex-col gap-y-2 ${isOpen ? 'items-start' : 'justify-center items-center'}`}>
                                {
                                    navItems.map((item) => (
                                        <Button key={item.title} variant={pathname === item.url ? 'outline' : 'ghost'} size='icon' className={`${isOpen ? ' w-full' : ''} justify-start hover:cursor-pointer`}
                                            onClick={() => router.push(item.url)}>

                                            <item.icon className='ml-2' />
                                            <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.title}</span>
                                        </Button>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <SidebarUser
                                user={{
                                    name: me?.name || 'User',
                                    image: me?.image || undefined,
                                    email: me?.email || '',
                                    isOpen,
                                    tier: me?.tier || 'Free'
                                }} />
                        </div>
                    </motion.div>
                )
            }
        </div>
    )
}
