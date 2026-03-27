'use client';

import Loading from "@/components/loading";
import CreateWishItemModal from "@/components/modal/create-wishitem-modal";
import EditWishItemModal from "@/components/modal/edit-wishitem-modal";
import { Button } from "@/components/ui/button";
import WishlistItem from "@/components/wishlist-item";
import { WishItem, WishlistApiResponse, Wishlists } from "@/types/api";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function WishlistPage() {

  const params = useParams();
  const wishlistId = params.id as string;
  const [wishlist, setWishlist] = useState<Wishlists | null>(null);
  const [items, setItems] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishItem | null>(null);
  const loadedWishlistIdRef = useRef<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    if (!wishlistId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/wishlists/${wishlistId}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = (await res.json()) as WishlistApiResponse;
      const normalizedItems = Array.isArray(data.wishItems)
        ? data.wishItems
        : Array.isArray(data.items)
          ? data.items
          : [];

      setWishlist({ ...data, wishItems: normalizedItems });
      setItems(normalizedItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, [wishlistId]);

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/wishlists/${wishlistId}/items?id=${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      await fetchWishlist();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (wishlistId && loadedWishlistIdRef.current !== wishlistId) {
      loadedWishlistIdRef.current = wishlistId;
      fetchWishlist();
    }
  }, [wishlistId, fetchWishlist]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>;
  }

  if (!wishlist) {
    return <div className="flex flex-col items-center gap-y-2 justify-center h-screen">
      <p className="text-neutral-400 text-xl">Wishlist not found.</p>
      <Button variant="outline" size="sm" className="ml-4" onClick={() => window.location.href = "/wishlists"}>
        Back to wishlists
      </Button>

    </div>;
  }

  return (
    <div>
      {/* //todo: arrumar o window back, trocar pra router push ou sla  */}
      <div className="flex gap-4">
        <Button variant="outline" size="sm" className="mb-4" onClick={() => window.history.back()}>
          Back to wishlists
        </Button>
        <h1 className="text-2xl text-neutral-200">{wishlist.title}</h1>
      </div>
      <p className="text-neutral-400">{wishlist.description}</p>

      <div className="mt-2">
        <Button variant="outline" onClick={() => {
          setIsCreateModalOpen(true);
        }}>
          + Add Item
        </Button>
      </div>
      <CreateWishItemModal
        wishlistId={wishlistId}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={fetchWishlist}
      />
      <EditWishItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        onEdit={fetchWishlist}
        wishlistId={wishlistId}
        wishlistItemId={selectedItem?.id ?? ""}
        initialName={selectedItem?.name}
        initialDescription={selectedItem?.description}
        initialValue={selectedItem?.value}
        initialUrl={selectedItem?.url}
        initialImage={selectedItem?.image}
      />
      <div className="mt-4 flex flex-wrap gap-4">
        {items.map((item) => (
          <WishlistItem
            key={item.id}
            name={item.name}
            value={item.value}
            description={item.description}
            url={item.url}
            image={item.image}
            onEdit={() => {
              setSelectedItem(item);
              setIsEditModalOpen(true);
            }}
            onDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </div>
    </div>

  )
}