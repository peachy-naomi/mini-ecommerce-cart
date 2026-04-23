import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "ShopNow — Quality Products at Your Fingertips",
    description: "Discover amazing products at great prices"
}

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                    <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
                        New Arrivals
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Shop Smarter. <br />
                        <span className="text-orange-400">Live Better.</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mb-8">
                        Discover thousands of quality products across fashion, electronics, jewellery and more — all in one place.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <Link href="/product">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition">
                                Shop Now
                            </button>
                        </Link>
                        <Link href="/cart">
                            <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition">
                                View Cart
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "Men's Clothing", emoji: "👔", color: "bg-blue-50 border-blue-200" },
                        { name: "Women's Clothing", emoji: "👗", color: "bg-pink-50 border-pink-200" },
                        { name: "Electronics", emoji: "💻", color: "bg-yellow-50 border-yellow-200" },
                        { name: "Jewelery", emoji: "💍", color: "bg-purple-50 border-purple-200" },
                    ].map((cat) => (
                        <Link key={cat.name} href="/product">
                            <div className={`${cat.color} border rounded-2xl p-6 text-center hover:shadow-md transition cursor-pointer`}>
                                <div className="text-4xl mb-3">{cat.emoji}</div>
                                <p className="font-semibold text-gray-700 text-sm">{cat.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: "🚚", title: "Free Shipping", desc: "On all orders above $50" },
                            { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted" },
                            { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
                        ].map((feature) => (
                            <div key={feature.title} className="flex flex-col items-center gap-2">
                                <span className="text-3xl">{feature.icon}</span>
                                <h3 className="font-bold text-gray-800">{feature.title}</h3>
                                <p className="text-gray-500 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-orange-500 text-white py-16">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to start shopping?
                    </h2>
                    <p className="text-orange-100 mb-8">
                        Browse our full collection and find something you love.
                    </p>
                    <Link href="/product">
                        <button className="bg-white text-orange-500 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition">
                            Explore Products
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xl font-bold text-white mb-2">ShopNow</p>
                    <p className="text-sm">© 2025 ShopNow. Built with Next.js & Tailwind CSS.</p>
                </div>
            </footer>

        </div>
    )
}
