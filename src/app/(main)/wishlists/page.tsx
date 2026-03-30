"use client"

import Loading from "@/components/loading";
import CreateWishModal from "@/components/modal/create-wish-modal";
import EditWishModal from "@/components/modal/edit-wish-modal";
import { Button } from "@/components/ui/button";
import WishItemRender from "@/components/wishItemRender";
import { useMe } from "@/hooks/use-me";
import { Wishlists } from "@/types/api";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function FavoritesPage() {

  const { me, loading } = useMe();
  const [wishlists, setWishlists] = useState<Wishlists[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWishlistId, setEditingWishlistId] = useState("");
  const [editingWishlistTitle, setEditingWishlistTitle] = useState("");
  const [wishSelected, setWishSelected] = useState<Wishlists | null>(null);
  const loadedRef = useRef(false);

  const fetchWishlists = async () => {
    const res = await fetch(`/api/wishlists`);
    if (!res.ok) return;
    const data = await res.json();
    const fetchedWishlists = data.wishlists ?? [];
    setWishlists(fetchedWishlists);
    setWishSelected((prev) => {
      if (!fetchedWishlists.length) return null;
      if (!prev) return fetchedWishlists[0];
      return fetchedWishlists.find((wishlist: Wishlists) => wishlist.id === prev.id) ?? fetchedWishlists[0];
    });
    console.log(data.wishlists);
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

  console.log(wishlists);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <h1 className="text-2xl text-neutral-200">Lista de desejos de {me?.name?.split(' ')[0]}</h1>

        <span>
          {me?.tier === 'free' && wishlists.length >= 3 && (
            <span className="text-sm text-red-500 ml-2">
              Seja um usuário Plus para criar mais de 3 wishlists!
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-x-2 mb-4">
        <p>Suas Listas</p>
        <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}
          disabled={
            !me || wishlists.length >= 3 && me.tier === 'free'
          }
        >
          Criar Wishlist <Plus />
        </Button>
      </div>
      <div className="w-full flex justify-between gap-x-1 h-full">
        <div className="w-[15%] h-full border flex flex-col gap-y-4 py-3 px-1 overflow-y-auto">

          {wishlists.map((wishlist) => (
            <div
              key={wishlist.id}
              className="h-6  flex items-center p-2"
              onClick={() => setWishSelected(wishlist)}
            >
              <h1 className="hover:text-orange-400 hover:underline">{wishlist.title}</h1>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingWishlistId(wishlist.id);
                  setEditingWishlistTitle(wishlist.title);
                  setIsEditModalOpen(true);
                }}
              >
                <Pencil />
              </Button>
            </div>
          ))}
        </div>
        <div className="w-[85%] h-full border">
          {wishSelected ? (<WishItemRender wish={wishSelected} />) : (<p>Selecione uma wishlist</p>)}
        </div>
      </div>

      <CreateWishModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={fetchWishlists}
      />

      <EditWishModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={fetchWishlists}
        wishlistId={editingWishlistId}
        initialTitle={editingWishlistTitle}
      />
    </div>
  )
}
