'use client'

import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import PlusMenu from './plusMenu'
import Separator from './separator'

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

    const [plusOpen, setPlusOpen] = useState(false)

    return (
        <div className='relative'>
            {user.isOpen ?
                (
                    <div className='flex items-center gap-2 hover:bg-foreground/10 p-1 rounded-md transition-colors'>
                        <img src={user.image} alt={user.name} className='size-9 rounded-md' />
                        <div className='flex flex-col'>
                            <p className='text-foreground text-sm'>{user.name.split(' ')[0]}</p>
                            <Badge variant='outline' className='text-xs'>{user.tier}</Badge>
                        </div>

                        {plusOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
                                <PlusMenu />
                            </div>
                        )}

                        <Button variant='ghost' size='icon' className='ml-auto' onClick={() => {
                            setPlusOpen(!plusOpen)
                        }}>
                            <Ellipsis />
                        </Button>
                    </div>
                ) : (
                    <p className='text-foreground text-sm'>{user.name.charAt(0)}</p>
                )
            }
        </div>
    )
}
