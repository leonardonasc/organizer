import { Wishlists } from '@/types/api'
import { useEffect, useState } from 'react'
import CreateWishItemModal from './modal/create-wishitem-modal';
import { Button } from './ui/button';
import EditWishItemModal from './modal/edit-wishitem-modal';
import { Pencil, Plus, Trash } from 'lucide-react';

interface WishItemRenderProps {
    wish: Wishlists;
}

export default function WishItemRender({ wish: initialWish }: WishItemRenderProps) {
    const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [editingItemId, setEditingItemId] = useState("");
    const [editingName, setEditingName] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingValue, setEditingValue] = useState(0);
    const [editingUrl, setEditingUrl] = useState("");
    const [editingImage, setEditingImage] = useState("");
    const [wish, setWish] = useState(initialWish);

    useEffect(() => {
        setWish(initialWish);
    }, [initialWish]);

    const refetchWish = async () => {
        const res = await fetch(`/api/wishlists/${wish.id}/items`);
        if (!res.ok) return;
        const data = await res.json();
        setWish({ ...wish, wishItems: data.items ?? [] });
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        const res = await fetch(`/api/wishlists/${wish.id}/items?id=${itemId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            alert("Failed to delete item. Please try again.");
            return;
        }
        await refetchWish();
    };

    const convertCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return (
        <div className='mt-2 p-4'>
            <div className='flex justify-between items-center px-2'>
                <h1>{wish.title}</h1>
                <Button variant="outline" onClick={() => setIsCreateItemModalOpen(true)}>
                    Adicionar itens<Plus />
                </Button>
            </div>
            <div className="w-full flex-wrap flex overflow-y-auto gap-4 p-2">
                {wish.wishItems.map((item) => (
                    <div key={item.id} className="border bg-neutral-800 w-60 h-auto flex flex-col rounded-lg overflow-hidden">
                        <a href={item.url || '#'} className='w-full' target="_blank" rel="noopener noreferrer">
                            <div className='w-full h-60 overflow-hidden justify-center flex items-center bg-white'>
                                <img
                                    src={item.image || "https://placehold.co/300x300"}
                                    className='h-full'
                                    alt={item.name}
                                />
                            </div>
                            <div className='flex flex-col p-2.5'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-sm text-ellipsis line-clamp-1 capitalize'>{toTitleCase(item.name)}</h2>
                                    <Button variant='outline' size='icon' className='ml-auto'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEditingItemId(item.id);
                                            setEditingName(item.name);
                                            setEditingDescription(item.description ?? "");
                                            setEditingValue(item.value);
                                            setEditingUrl(item.url ?? "");
                                            setEditingImage(item.image ?? "");
                                            setIsEditItemModalOpen(true);
                                        }}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button variant='outline' size='icon' className='ml-1'
                                        onClick={(e) =>{
                                            e.preventDefault();
                                            handleDeleteItem(item.id)
                                        } 
                                            }
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                                <p className='font-mono text-sm'>{convertCurrency(item.value)}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>

            <EditWishItemModal
                isOpen={isEditItemModalOpen}
                onClose={() => setIsEditItemModalOpen(false)}
                onEdit={refetchWish}
                wishlistId={wish.id}
                wishlistItemId={editingItemId}
                initialName={editingName}
                initialDescription={editingDescription}
                initialValue={editingValue}
                initialUrl={editingUrl}
                initialImage={editingImage}
            />

            <CreateWishItemModal
                isOpen={isCreateItemModalOpen}
                onClose={() => setIsCreateItemModalOpen(false)}
                onCreate={refetchWish}
                wishlistId={wish?.id ?? ''}
            />
        </div>
    )
}