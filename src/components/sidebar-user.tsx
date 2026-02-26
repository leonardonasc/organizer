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
        <div className='flex w-full items-center justify-between gap-x-2'>
            <div className='gap-x-2 flex-1 border border-neutral-800 rounded-lg p-2'>
                <div className={`flex items-center ${user.isOpen ? '' : 'justify-center'} gap-x-2`}>
                    <Image src={user.image || 'https://placehold.co/400'} alt={user.name} width={20} height={20} className='rounded-full' />
                    <h1 className={`text-sm ${user.isOpen ? 'block' : 'hidden'}`}>{user.name.split(' ')[0]}</h1>
                    <Badge variant='outline' className={`ml-auto ${user.isOpen ? 'block' : 'hidden'}`}>{user.tier}</Badge>
                </div>
            </div>
            <Button variant='ghost' size='icon' className={`border border-neutral-800 flex text-center ${user.isOpen ? 'flex' : 'hidden'}`} onClick={() => signOut({ callbackUrl: '/login' })}>
                <LogOutIcon />
            </Button>
        </div>
    )
}
