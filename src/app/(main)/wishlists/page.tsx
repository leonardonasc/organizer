"use client"

import Loading from "@/components/loading";
import CreateWishModal from "@/components/modal/create-wish-modal";
import { Button } from "@/components/ui/button";
import WishlistItem from "@/components/wishlist-item";
import { useMe } from "@/hooks/use-me";
import { Wishlists } from "@/types/api";
import { useEffect, useRef, useState } from "react";

export default function FavoritesPage() {

  const { me, loading } = useMe();
  const [wishlists, setWishlists] = useState<Wishlists[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const loadedRef = useRef(false);

  const fetchWishlists = async () => {
    const res = await fetch(`/api/wishlists`);
    if (!res.ok) return;
    const data = await res.json();
    setWishlists(data.wishlists ?? []);
  };

  useEffect(() => {
    if (me && !loadedRef.current) {
      loadedRef.current = true;
      fetchWishlists();
    }
  }, [me]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl text-neutral-200">{me?.name?.split(' ')[0]}'s Wishlists</h1>
        <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}
          disabled={
            !me || wishlists.length >= 3 && me.tier === 'free'
          }
        >
          + Create Wishlist
        </Button>
        <span>
          {me?.tier === 'free' && wishlists.length >= 3 && (
            <span className="text-sm text-red-500 ml-2">
              Upgrade to Pro to create more than 3 wishlists.
            </span>
          )}
        </span>
      </div>


      <div className="flex flex-wrap gap-3">
        {wishlists.map((wishlist) => (
          <WishlistItem
            key={wishlist.id}
            id={wishlist.id}
            title={wishlist.title}
            onDeleted={fetchWishlists}
          />
        ))}
        <CreateWishModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={fetchWishlists}
        />
      </div>
    </div >
  )
}
