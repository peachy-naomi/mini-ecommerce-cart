'use client'

import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '@/app/components/context'

interface Props {
    id: number        // ← changed from string to number
    title: string
    price: number
    image: string
    description: string
    count: number
    rate: number
    category: string
}

export default function ProductWithCart({
    id, title, price, image, description, count, rate, category
}: Props) {
    const { add, cartItems } = useContext(CartContext)!

    const isInCart = cartItems.some(item => item.id === id)

    const product = {
        id,
        title,
        price,
        image,
        description,
        count,
        rate,
        category
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-10">

                {/* Back link */}
                <Link href="/product" className="text-sm text-orange-500 hover:underline mb-6 inline-block">
                    ← Back to Products
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-10">

                    {/* Image */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-8 md:w-80 flex-shrink-0">
                        <Image
                            src={image}
                            alt={title}
                            width={280}
                            height={280}
                            className="object-contain h-64 w-64"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                        <span className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
                            {category}
                        </span>

                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            {title}
                        </h1>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-gray-600 text-sm">
                                {rate} out of 5 ({count} reviews)
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {description}
                        </p>

                        <div className="mt-auto">
                            <p className="text-3xl font-bold text-gray-900 mb-6">
                                ${price}
                            </p>

                            <div className="flex gap-3 flex-wrap">
                                <button
                                    onClick={() => add(product)}
                                    disabled={isInCart}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition ${
                                        isInCart
                                            ? "bg-green-500 text-white cursor-default"
                                            : "bg-orange-500 hover:bg-orange-600 text-white"
                                    }`}
                                >
                                    <FaShoppingCart />
                                    {isInCart ? "Added to Cart ✓" : "Add to Cart"}
                                </button>

                                <Link href="/cart">
                                    <button className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:border-orange-400 hover:text-orange-500 transition">
                                        View Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}