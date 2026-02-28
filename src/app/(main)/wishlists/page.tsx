"use client"

import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function FavoritesPage() {
  const { data: session } = useSession();

  const wishlists = [
    {
      id: 1,
      name: "Electronics",
    },
    {
      id: 2,
      name: "Books",
    },
    {
      id: 3,
      name: "Clothing",
    },
    {
      id: 4,
      name: "Home & Kitchen",
    },

    {
      id: 5,
      name: "Electronics",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl text-neutral-200">Manage your wishlists</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {wishlists.map((wishlist) => (
          <Card key={wishlist.id} className="w-60 bg-neutral-900 h-40 flex items-center justify-center">
            <h2 className="text-lg text-neutral-200">{wishlist.name}</h2>
          </Card>

        ))}
        <Card className="w-60 h-40 bg-neutral-800 cursor-pointer flex items-center justify-center"
          onClick={() => { console.log("Create new wishlist") }}
        >
          <span className="text-neutral-200">Create new wishlist</span>
        </Card>
      </div>
    </div>
  )
}
