import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

interface BuyProps {
    isOpen?: boolean
    tier?: string
}

export default function Buy({ isOpen, tier }: BuyProps) {

    return (

        <Button variant={'outline'} className="w-full cursor-pointer border-2 border-neutral-800 bg-linear-to-r from-neutral-900 to-neutral-800" onClick={() => { console.log("Upgrade to premium") }}>
            {isOpen ?
                <div className="flex gap-x-1 items-center text-neutral-300"><ChevronUp size={20} /> upgrade to pro </div> : <ChevronUp size={20} />}
        </Button>

    )
}
