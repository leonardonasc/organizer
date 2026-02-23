import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface BuyProps {
    isOpen?: boolean
    tier?: string
}

export default function Buy({ isOpen, tier }: BuyProps) {

    return (
        <div className={`w-full ${isOpen ? 'block' : 'hidden'}`}>
            <Card className="border-neutral-800">
                <CardHeader>
                    <CardTitle>Upgrade</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        If you are enjoying Organizer, consider upgrading to the premium version for just $5/month. Unlock exclusive features and support our development!
                    </CardDescription>
                    <Button className="w-full mt-4">
                        Upgrade now
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
