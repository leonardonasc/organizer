export type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  tier: string | null;
} | null;

export type WishItem = {
  id: string;
  name: string;
  value: number;
  description?: string;
  url: string;
  image?: string;
  wishlistId: string;
  createdAt: string;
};

export type Wishlists = {
  id: string;
  title: string;
  description?: string;
  userId: string;
  wishItems: WishItem[];
  createdAt: string;
};

export type WishCreate = {
  title: string;
  description?: string;
  visibility?: "public" | "private";
}

export type WishItemCreate = {
  name: string;
  description?: string;
  value: number;
  url: string;
  image?: string;
  wishlistId: string;
}

export type WishlistApiResponse = Omit<Wishlists, "wishItems"> & {
  wishItems?: WishItem[];
  items?: WishItem[];
};

