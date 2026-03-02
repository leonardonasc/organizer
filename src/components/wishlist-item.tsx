
interface WishlistItemProps {
    name: string
    category?: string
}

export default function WishlistItem({ name, category }: WishlistItemProps) {

    return (
        <div className="w-60 h-40 bg-neutral-800 rounded-lg flex items-center justify-center">
            <h2 className="text-lg text-neutral-200">{name}</h2>
        </div>
    )
}
