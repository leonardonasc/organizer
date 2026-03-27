import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface EditWishItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: () => Promise<void>;
    wishlistId: string;
    wishlistItemId: string;
    initialName?: string;
    initialDescription?: string;
    initialValue?: number;
    initialUrl?: string;
    initialImage?: string;
}

export default function EditWishItemModal({
    isOpen,
    onClose,
    onEdit,
    wishlistId,
    wishlistItemId,
    initialName,
    initialDescription,
    initialValue,
    initialUrl,
    initialImage,
}: EditWishItemModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        setName(initialName ?? "");
        setDescription(initialDescription ?? "");
        setValue(initialValue ?? 0);
        setUrl(initialUrl ?? "");
        setImage(initialImage ?? "");
    }, [
        isOpen,
        initialName,
        initialDescription,
        initialValue,
        initialUrl,
        initialImage,
    ]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `/api/wishlists/${wishlistId}/items?id=${wishlistItemId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, description, value, url, image }),
                },
            );

            if (!res.ok) {
                alert("Failed to edit wishlist item. Please try again.");
                return;
            }

            if (onEdit) {
                await onEdit();
            }

            onClose();
        } catch (error) {
            console.error("Error editing wish item:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-neutral-900 p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl">Edit Wishlist Item</h2>
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
                        <label className="mb-1 block text-sm">Name</label>
                        <input
                            type="text"
                            className="w-full rounded border border-neutral-700 bg-neutral-800 p-2"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-sm">Value</label>
                        <input
                            type="number"
                            className="w-full rounded border border-neutral-700 bg-neutral-800 p-2"
                            required
                            value={value}
                            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-sm">URL</label>
                        <input
                            type="url"
                            className="w-full rounded border border-neutral-700 bg-neutral-800 p-2"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-sm">Image URL</label>
                        <input
                            type="url"
                            className="w-full rounded border border-neutral-700 bg-neutral-800 p-2"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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
