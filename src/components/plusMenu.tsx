import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { DoorOpen } from "lucide-react";

export default function PlusMenu() {
    return (
        <div className="w-full rounded-md border text-sm bg-background p-2 shadow-lg">

            <div className="flex justify-between items-center">

                <p>Logout</p>
                <Button variant="outline" size="sm" onClick={() => {
                    signOut()
                }}>
                    <DoorOpen />
                </Button>
            </div>
        </div>
    )
}