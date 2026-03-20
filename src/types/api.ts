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
  description?: string;
  url: string;
  image?: string;
  wishlistId: string;
};

export type Wishlists = {
  id: string;
  title: string;
  description?: string;
  userId: string;
  wishItems: WishItem[];
};

export type WishCreate = {
  title: string;
  description?: string;
  visibility?: "public" | "private";
}

export type WishItemCreate = {
  name: string;
  description?: string;
  url: string;
  image?: string;
  wishlistId: string;
}
