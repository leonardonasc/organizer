import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";


type WishlistItemProps = {
    id: string;
    title: string;
    onDeleted?: () => Promise<void>;
};

export default function WishlistItem({ id, title, onDeleted }: WishlistItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/wishlists?id=${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                alert("Failed to delete wishlist");
                return;
            }

            if (onDeleted) {
                await onDeleted();
            }
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="p-4 bg-neutral-800 rounded-lg w-50 h-50 flex justify-between items-start">
            {title}
            <Button variant="outline" size="icon" className=""
                disabled={isDeleting}
                onClick={
                    () => {
                        // TODO: arrumar essa confirmação, talvez um modal
                        if (confirm('Are you sure you want to delete this wishlist?')) {
                            handleDelete();
                        }
                    }
                }
            >
                <Trash size={16} />
            </Button>
        </div>
    )
}
