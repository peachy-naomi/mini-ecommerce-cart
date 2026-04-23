export const dynamic = "force-dynamic"   // ← add this

import ProductWithCart from "@/app/components/cartbutton"

interface ProductPage {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const products = await response.json()
    return products.map((product: { id: number }) => ({
      id: String(product.id)
    }))
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export default async function ProductDetail({ params }: ProductPage) {
  const { id } = await params

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) throw new Error("Failed to fetch product")
    const prod = await response.json()

    return (
      <ProductWithCart
        id={prod.id}
        title={prod.title}
        image={prod.image}
        category={prod.category}
        description={prod.description}
        rate={prod.rating.rate}
        count={prod.rating.count}
        price={prod.price}
      />
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    )
  }
}