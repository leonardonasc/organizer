import { useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface CreateWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: () => Promise<void>;
}

export default function CreateWishModal({ isOpen, onClose, onCreate }: CreateWishModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, visibility }),
      });

      if (!res.ok) {
        alert("Failed to create wishlist");
        setIsLoading(false);
        return;
      }

      if (onCreate) {
        await onCreate();
      }

      setTitle("");
      setDescription("");
      setVisibility("public");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-5 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Create Wishlist</h2>
          <Button variant="outline" size="icon" onClick={onClose} disabled={isLoading}>
            <XIcon size={16} />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Visibility</label>
            <select
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
              required
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
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
