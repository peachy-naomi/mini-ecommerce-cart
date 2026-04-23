import ProductWithCart from "@/app/components/cartbutton"

interface ProductPage {
    params: Promise<{
        id: string
    }>
}

export async function generateStaticParams() {
    const response = await fetch("https://fakestoreapi.com/products")
    const products = await response.json()
    return products.map((product: { id: number }) => ({
        id: String(product.id)
    }))
}

export default async function ProductDetail({ params }: ProductPage) {
    const { id } = await params
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
}
