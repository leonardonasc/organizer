type WishlistItemProps = {
    id: string;
    title: string;
    onDelete?: (id: string) => void;
};

export default function WishlistItem({ id, title, onDelete }: WishlistItemProps) {

    return (
        <div className="w-60 h-40 bg-neutral-800 rounded-lg flex items-center justify-center"
        onClick={() => { if (onDelete) onDelete(id) }}
        >
            <h2 className="text-lg text-neutral-200">{title}</h2>
        </div>
    )
}
