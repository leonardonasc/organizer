import Image from 'next/image'
import React from 'react'
import { LogoutIcon } from './ui/logout'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { Badge } from './ui/badge'

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
        <div className="w-full flex items-center gap-x-2 p-2 border border-neutral-800 rounded-2xl">
            <Image src={user.image || 'https://placehold.co/400'} alt={user.name} width={32} height={32} className='rounded-full' />
            <div className={`flex w-full items-center gap-x-2 ${user.isOpen ? 'flex justify-between' : 'hidden'} `}>
                <div className='flex gap-x-2'>
                    <span className="text-sm">{user.name.split(' ')[0]}</span>
                    <Badge variant={'secondary'}>{user.tier || 'Free'}</Badge>
                </div>
                <Button variant={'ghost'} size={'icon'}
                    onClick={() => {
                        signOut()
                    }}
                >
                    <LogoutIcon className='cursor-pointer text-neutral-200' size={15} />
                </Button>
            </div>

        </div>
    )
}
