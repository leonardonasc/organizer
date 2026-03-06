"use client"

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import WishlistItem from "@/components/wishlist-item";
import { useMe } from "@/hooks/use-me";
import { Wishlists } from "@/types/api";
import { useEffect, useState } from "react";

export default function FavoritesPage() {

  const { me, loading } = useMe();
  const [wishlists, setWishlists] = useState<Wishlists[]>([]);

  useEffect(() => {
    if (me) {
      const fetchWishlists = async () => {
        const res = await fetch(`/api/wishlists`);
        if (!res.ok) return;
        const data = await res.json();
        setWishlists(data.wishlists ?? []);
      };
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

  const handleCreateWishlist = async () => {
    const title = prompt("Enter wishlist title:");
    if (!title) return;

    const res = await fetch("/api/wishlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      alert("Failed to create wishlist");
      return;
    }
  }

  const handleDeleteWishlist = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wishlist?")) return;
    const res = await fetch(`/api/wishlists?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete wishlist");
      return;
    }
    setWishlists(wishlists.filter((w) => w.id !== id));
  }


  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl text-neutral-200">{me?.name?.split(' ')[0]}'s Wishlists</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {wishlists.map((wishlist) => (
          <WishlistItem key={wishlist.id} id={wishlist.id} title={wishlist.title} onDelete={handleDeleteWishlist} />
        ))}
        <Button onClick={() =>
          handleCreateWishlist()
        }>
          Create New Wishlist
        </Button>
      </div>
    </div >
  )
}
