import { Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";


interface WishlistItemProps {
    name?: string;
    value?: number;
    description?: string;
    url?: string;
    image?: string;
    onDelete?: () => void;
    onEdit?: () => void;
}


export default function WishlistItem({ name, value, url, image, onDelete, onEdit }: WishlistItemProps) {

    const convertToBRL = (amount: number) => {
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div className="flex flex-col w-48 rounded-lg bg-white overflow-hidden">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img
                    src={image || "https://placehold.co/128"}
                    alt={name}
                    className="w-48 h-32 object-cover"
                />
            </a>

            <div className="flex flex-col  w-full p-2 text-black">
                <div className="flex items-center justify-between">

                    <h2 className="text-md font-semibold capitalize">{name}</h2>
                    <div className="flex gap-x-1">
                        <Button variant="ghost"
                            className="hover:text-black"
                            size="icon" onClick={onEdit}>
                            <Pencil size={16} className="cursor-pointer" />
                        </Button>
                        <Button variant="ghost" size="icon"
                            className="hover:text-black"
                            onClick={onDelete}
                        >
                            <Trash size={16} className="cursor-pointer" />
                        </Button>
                    </div>
                </div>
                <p className="text-sm font-mono">{value ? convertToBRL(value) : "N/A"}</p>
            </div>

        </div>
    )
}


