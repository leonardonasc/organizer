import { useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface CreateWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: () => Promise<void>;
  wishlistId: string;
}

export default function CreateWishItemModal({ isOpen, onClose, onCreate, wishlistId }: CreateWishModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/wishlists/${wishlistId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, value, url, image }),
      });

      if (!res.ok) {
        alert("Failed to create wishlist item. Please try again.");
        setIsLoading(false);
        return;
      }

      if (onCreate) {
        await onCreate();
      }

      setName("");
      setDescription("");
      setValue(0);
      setUrl("");
      setImage("");

      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-5 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Create Wishlist Item</h2>
          <Button variant="outline" size="icon" onClick={onClose} disabled={isLoading}>
            <XIcon size={16} />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Value</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
              required
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">URL</label>
            <input
              type="url"
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
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
              className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
