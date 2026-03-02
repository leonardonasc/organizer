"use client"

import { Card } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function GetStartedPage() {

    const { data: session } = useSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col gap-y-6">
            <div className='flex flex-col'>
                <h1 className="text-2xl text-neutral-200">Welcome, {session?.user?.name}!</h1>
                <p className="text-sm text-neutral-500">Let's get you started on your journey to organize your life and boost your productivity.</p>
            </div>
            <div>
                <Card className='flex-1 p-2'>
                    <h2 className="text-lg text-neutral-200 font-semibold mb-2">Getting Started</h2>
                </Card>
            </div>
            <div className='flex gap-x-2'>
                <Card className='flex-1 p-2'>
                    <h2 className="text-lg text-neutral-200 font-semibold mb-2">Getting Started</h2>
                </Card>
                <Card className='flex-1 p-2'>
                    <h2 className="text-lg text-neutral-200 font-semibold mb-2">Getting Started</h2>
                </Card>
            </div>
            <div className='flex flex-col gap-y-2'>
                <h2 className="text-lg text-neutral-200 font-semibold mb-2">Next Steps</h2>
                <div className='flex gap-x-2'>
                    <Card className='p-2'>
                        <span>imagem</span>
                        <span>descricao</span>
                    </Card>
                    <Card className='p-2'>
                        <span>imagem</span>
                        <span>descricao</span>
                    </Card>
                    <Card className='p-2'>
                        <span>imagem</span>
                        <span>descricao</span>
                    </Card>
                </div>
            </div>
        </div>
    )
}
