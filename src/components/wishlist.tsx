import { Button } from "./ui/button";
import { useState } from "react";


type WishlistItemProps = {
    id: string;
    title: string;
    onDeleted?: () => Promise<void>;
    goToWishlist?: string;
    length?: number;
};

export default function Wishlist({ id, title, onDeleted, goToWishlist }: WishlistItemProps) {
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
        <div className="p-4 bg-neutral-800 rounded-lg w-50 h-30 flex flex-col justify-between items-start" onClick={() => {
            if (goToWishlist) {
                window.location.href = `/wishlists/${id}`;
            }
        }}>
            {title}

            <Button>
                <p>Go to Wishlist</p>
            </Button>
        </div>
    )
}
