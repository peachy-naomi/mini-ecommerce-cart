'use client'

import { useState, useContext, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CartContext } from "@/app/components/context"


interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

const categories = ["all", "men's clothing", "women's clothing", "electronics", "jewelery"]

export default function FetchProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [filtered, setFiltered] = useState<Product[]>([])
    const [activeCategory, setActiveCategory] = useState("all")
    const [loading, setLoading] = useState(true)

    const cartContext = useContext(CartContext)
    if (!cartContext) throw new Error("CartContext not found")
    const { add, cartItems } = cartContext

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products")
                const data: Product[] = await response.json()
                setProducts(data)
                setFiltered(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProductData()
    }, [])

    useEffect(() => {
        if (activeCategory === "all") {
            setFiltered(products)
        } else {
            setFiltered(products.filter(p => p.category === activeCategory))
        }
    }, [activeCategory, products])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm">Loading products...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
                    <p className="text-gray-500 text-sm">{filtered.length} products found</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize border transition ${
                                activeCategory === cat
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"
                            }`}
                        >
                            {cat === "all" ? "All" : cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col hover:shadow-md transition"
                        >
                            {/* Product Image */}
                            <Link href={`/product/${product.id}`}>
                                <div className="flex items-center justify-center h-48 mb-4 bg-gray-50 rounded-xl cursor-pointer hover:opacity-80 transition">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={160}
                                        height={160}
                                        className="h-40 w-40 object-contain"
                                    />
                                </div>
                            </Link>

                            {/* Product Info */}
                            <div className="flex-1">
                                <span className="text-xs text-orange-500 font-semibold uppercase tracking-wide">
                                    {product.category}
                                </span>
                                <h2 className="font-semibold text-gray-800 text-sm mt-1 mb-2 line-clamp-2">
                                    {product.title}
                                </h2>
                                <div className="flex items-center gap-1 mb-3">
                                    <span className="text-yellow-400 text-sm">⭐</span>
                                    <span className="text-sm text-gray-600">
                                        {product.rating.rate} ({product.rating.count})
                                    </span>
                                </div>
                                <p className="font-bold text-gray-900 text-lg mb-4">
                                    ${product.price}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 mt-auto">
                                <Link href={`/product/${product.id}`} className="flex-1">
                                    <button className="w-full border border-gray-200 text-gray-700 text-sm px-3 py-2 rounded-xl hover:border-orange-400 hover:text-orange-500 transition">
                                        View
                                    </button>
                                </Link>
                                <button
                                    onClick={() => add({
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    image: product.image,
                                    description: product.description,
                                    category: product.category,
                                    rate: product.rating.rate,     
                                    count: product.rating.count,  
                                })}
                                    className={`flex-1 text-sm px-3 py-2 rounded-xl font-medium transition ${
                                        cartItems.some(i => i.id === product.id)
                                            ? "bg-green-500 text-white cursor-default"
                                            : "bg-orange-500 text-white hover:bg-orange-600"
                                    }`}
                                >
                                    {cartItems.some(i => i.id === product.id) ? "Added ✓" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
