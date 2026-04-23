'use client'

import { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { CartContext } from "@/app/components/context"

export default function CartPage() {
    const cartContext = useContext(CartContext)
    if (!cartContext) throw new Error("CartContext not found")
    const { cartItems, remove } = cartContext

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Cart
                        {cartItems.length > 0 && (
                            <span className="ml-3 text-sm font-medium bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full">
                                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                            </span>
                        )}
                    </h1>
                    <Link href="/product" className="text-sm text-orange-500 hover:underline">
                        ← Continue Shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                        <p className="text-5xl mb-4">🛒</p>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Looks like you haven't added anything yet.
                        </p>
                        <Link href="/product">
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Cart Items */}
                        <div className="flex-1 space-y-4">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm"
                                >
                                    <div className="bg-gray-50 rounded-xl p-2 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={72}
                                            height={72}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-orange-500 font-semibold uppercase mb-1">
                                            {item.category}
                                        </p>
                                        <h2 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                                            {item.title}
                                        </h2>
                                        <p className="font-bold text-gray-900">${item.price}</p>
                                    </div>

                                    <button
                                        onClick={() => remove(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition flex-shrink-0 p-2 rounded-xl hover:bg-red-50"
                                        aria-label="Remove item"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-72 flex-shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="font-bold text-gray-900 text-lg mb-4">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-4 border-b border-gray-100 pb-4">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-medium">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between font-bold text-gray-900 mb-6">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>

                                <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
                                    Checkout
                                </button>

                                <Link href="/product">
                                    <button className="w-full mt-3 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:border-orange-400 hover:text-orange-500 transition text-sm">
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
