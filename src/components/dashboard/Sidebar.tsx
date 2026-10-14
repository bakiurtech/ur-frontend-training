'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
    LayoutDashboard,
    Package,
    Menu,
    Plus,
    Settings,
    ChevronLeft,
} from 'lucide-react'

const links = [
    {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        exact: true,
    },
    { href: '/dashboard/products', label: 'Products', icon: Package },
    { href: '/dashboard/new', label: 'Add Product', icon: Plus },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <aside
            className={`${open ? 'w-48' : 'w-16'} overflow-hidden transition-[width] duration-300 ease-out h-svh border-r-2 border-(--background-sec) p-2.5 flex flex-col gap-2 sticky top-0`}
        >
            <button onClick={() => setOpen(!open)} className="p-2">
                {open ? (
                    <ChevronLeft className="btn-hover-animation text-(--icon-col) cursor-pointer" />
                ) : (
                    <Menu className="btn-hover-animation text-(--icon-col) cursor-pointer" />
                )}
            </button>

            {links.map(({ href, label, icon: Icon, exact }) => {
                const active = exact
                    ? pathname === href
                    : pathname === href || pathname.startsWith(href + '/')

                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center btn-hover-animation gap-3 p-2 rounded-xl ${active ? 'text-foreground' : 'text-(--icon-col)'}`}
                    >
                        <Icon className="btn-hover-animation shrink-0" />
                        <span
                            className={`font-semibold whitespace-nowrap transition-opacity duration-300 ease-out ${open ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {label}
                        </span>
                    </Link>
                )
            })}
        </aside>
    )
}
