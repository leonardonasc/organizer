"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

import {
    LayoutDashboard,
    Plane,
    LogOut,
    Heart,
    Banknote,
    NotebookPen,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

import { Button } from "./button"

export function AppSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    const mainNav = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Travels",
            url: "/travels",
            icon: Plane,
        },
        {
            title: "Favorites",
            url: "/favorites",
            icon: Heart,
        },
        {
            title: "Expenses",
            url: "/expenses",
            icon: Banknote,
        },
        {
            title: "Notes",
            url: "/notes",
            icon: NotebookPen,
        }
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className="text-2xl font-bold">Organizer</h1>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
                    <SidebarSeparator className="my-2 mx-0" />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNav.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.url

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <Link href={item.url}>
                                                <Icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                        <SidebarSeparator className="my-2 mx-0" />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                {session ? (
                    <div className="flex items-center justify-between gap-x-2 mb-2 px-2 border border-neutral-800 p-4 rounded-lg">
                        <div className="flex items-center gap-x-3">
                            {session.user?.image && (
                                <Image
                                    src={session.user.image}
                                    alt={session.user?.name || "User"}
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                />
                            )}
                            <div className="flex flex-col text-sm">
                                <span className="font-medium">
                                    {session.user?.name?.split(" ")[0]}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => signOut()}
                        >
                            <LogOut className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                        Não logado
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}