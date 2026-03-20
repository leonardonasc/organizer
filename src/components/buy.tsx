import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface BuyProps {
    isOpen?: boolean
    tier?: string
}

export default function Buy({ isOpen, tier }: BuyProps) {

    const router = useRouter();

    return (

        <Button variant={'outline'} className="w-full cursor-pointer border-2 border-neutral-800 bg-linear-to-r from-neutral-900 to-neutral-800" onClick={() => { router.push('/upgrade') }}>
            {isOpen ?
                <div className="flex gap-x-1 items-center text-neutral-300"><ChevronUp size={20}

                /> upgrade to pro </div> : <ChevronUp size={20} />}
        </Button>

    )
}
