'use client'

import { useContext } from "react"
import Link from "next/link"
import { CartContext } from "@/app/components/context"

export default function Navbar() {
    const cartContext = useContext(CartContext)
    const cartCount = cartContext?.cartItems.length ?? 0

    return (
        <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-xl font-bold text-orange-400 cursor-pointer">
                        ShopNow
                    </h1>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm text-gray-300 hover:text-white transition">
                        Home
                    </Link>
                    <Link href="/product" className="text-sm text-gray-300 hover:text-white transition">
                        Products
                    </Link>
                    <Link href="/cart">
                        <button className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-xl transition">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6a1 1 0 00.9 1.4H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
