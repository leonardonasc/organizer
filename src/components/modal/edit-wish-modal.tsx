import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface EditWishModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: () => Promise<void>;
    wishlistId: string;
    initialTitle?: string;
}

export default function EditWishModal({
    isOpen,
    onClose,
    onEdit,
    wishlistId,
    initialTitle,
}: EditWishModalProps) {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setTitle(initialTitle ?? "");
    }, [isOpen, initialTitle]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`/api/wishlists?id=${wishlistId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });

            if (!res.ok) {
                alert("Failed to edit wishlist");
                return;
            }

            if (onEdit) {
                await onEdit();
            }

            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-neutral-900 p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl">Edit Wishlist</h2>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <XIcon size={16} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-1 block text-sm">Title</label>
                        <input
                            type="text"
                            className="w-full rounded border border-neutral-700 bg-neutral-800 p-2"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="rounded bg-neutral-700 px-4 py-2 hover:bg-neutral-600 disabled:opacity-50"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
