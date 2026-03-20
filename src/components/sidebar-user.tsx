import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { Badge } from './ui/badge'
import { LogOutIcon } from 'lucide-react'

interface SidebarUserProps {
    user: {
        name: string
        image?: string
        email: string
        isOpen: boolean
        tier?: string
    }
}
export default function SidebarUser({ user }: SidebarUserProps) {
    return (
        <div className='flex w-full justify-between gap-x-2'>
            <div className='gap-x-2 flex-1 border border-neutral-800 rounded-lg p-2'>
                <div className={`flex items-center ${user.isOpen ? '' : 'justify-center'} gap-x-2`}>

                    {user.image ? (
                        <Image src={user.image} alt={user.name} width={24} height={24} className='rounded-full' />
                    ) : (
                        <div className='w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-xs text-white'>
                            {user.name.split(' ')[0][0]}
                        </div>
                    )}

                    <h1 className={`text-sm ${user.isOpen ? 'block' : 'hidden'}`}>{user.name.split(' ')[0]}</h1>
                    <Badge variant='outline' className={`ml-auto ${user.isOpen ? 'block' : 'hidden'} ${user.tier === 'Pro' ? 'bg-purple-900 text-white' : 'bg-gray-500 text-white'}`}>
                        {user.tier}
                    </Badge>
                </div>
            </div>
            <Button variant='ghost' className={`border h-full border-neutral-800 flex text-center ${user.isOpen ? 'flex' : 'hidden'}`} onClick={() => signOut({ callbackUrl: '/login' })}>
                <LogOutIcon />
            </Button>
        </div>
    )
}
