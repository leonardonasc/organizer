import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "framer-motion";

interface BuyProps {
    isOpen?: boolean
    tier?: string
}

export default function Buy({ isOpen, tier }: BuyProps) {

    return (
        <div className={`w-full my-4 ${isOpen ? 'block' : 'hidden'}`}>
            <Card className="border-neutral-800 bg-neutral-950 flex flex-col p-4">
                <h1 className="text-md text-neutral-200 flex gap-x-2"><ChevronUp className="" /> Boost your experience</h1>
                <span className="text-sm text-neutral-400">
                    Unlock exclusive features and support our development!</span>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                >
                    <Button variant={'outline'} className="w-full cursor-pointer text-neutral-200 border-neutral-800 bg-linear-to-r from-neutral-900 to-neutral-800" onClick={() => { console.log("Upgrade to premium") }}>Upgrade now</Button>
                </motion.div>
            </Card>
        </div>
    )
}
