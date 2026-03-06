"use client"

import Loading from '@/components/loading';
import { Card } from '@/components/ui/card';
import { useMe } from '@/hooks/use-me';
export default function GetStartedPage() {

    const { me, loading } = useMe();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-6">
            <div className='flex flex-col'>
                <h1 className="text-2xl text-neutral-200">Welcome, {me?.name ?? "Guest"}!</h1>
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
