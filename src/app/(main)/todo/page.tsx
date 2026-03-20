"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



export default function TodoPage() {

    const router = useRouter()

    const texts = [
        {
            // design
            items: [
                '🟪 login e register page',
                '🟥 dashboard',
                '🟥 travel page',
                '🟥 wishlist page',
                '🟨 arrumar o responsivo (done: xs/2xl)',
                '🟪 melhorar UI na side/nav bar'
            ],
        },
        {
            // develop
            items: [
                '🟥 requisições para wish e criação dos itens dentro da wish',
                '🟥 definir o funcionamento das travels',
                '🟥 criar os annotations',
                '🟨 definir quais serão as páginas realmente necessárias',
                '🟪 criar os tiers para definir as limitações',
                '🟥 implementar sistema de recuperação de senha',
                '🟥 implementar sistema de atualização de email/senha',
                '🟥 adicionar resend',
                '🟪 criação do modal para as wishes'
            ],
        },
        {
            // extras
            items: [
                '🟥 página para explicar a aplicação',
                '🟥 mensagem explicando o motivo das limitações, já que é uma demo',
                '🟥 3 wishlists no free tier',
            ],
        }

    ]

    return (
        <div className='p-4 flex justify-between h-full'>
            <div className='flex flex-col gap-4'>
                <h1 className="text-2xl font-bold mb-4">Todo List ✅</h1>
                <div className='flex flex-col'>
                    <aside> 🎨 Design</aside>
                    <div className='flex items-center'>
                        <div className='ml-3 flex flex-col text-sm text-neutral-400'>
                            {texts[0].items.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <aside> 🛠️ Desenvolvimento</aside>
                    <div className='ml-3 flex flex-col text-sm text-neutral-400'>
                        {texts[1].items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <aside>⛔ Limitações por tier</aside>
                    <div className='ml-3 flex flex-col text-sm text-neutral-400'>
                        {texts[2].items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <p> 🟥 - Not started</p>
                <p> 🟨 - In progress</p>
                <p> 🟪 - Planning</p>
                <p> 🟩 - Completed</p>
            </div>
        </div>
    )
}
