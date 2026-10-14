import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils/formatPrice'
import { getAllProducts } from '@/lib/services/fetchProduct'
import { ProductSingle } from '@/components/products/ProductSingle'
import { Plus } from 'lucide-react'

type Props = {
    params: Promise<{ id: string }>
}

async function findProduct(id: string) {
    const products = await getAllProducts()
    return products.find((p) => p.id === id)
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    const product = await findProduct(id)
    return {
        title: product ? `${product.name} | Luminous` : 'Product not found',
    }
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params
    const product = await findProduct(id)

    if (!product) notFound()

    return (
        <div className="p-2.5 w-full max-w-7xl mx-auto py-12.5 flex flex-col gap-2.5">
            <div className="w-full h-85 overflow-hidden">
                <ProductSingle product={product} />
            </div>
            <h1 className="text-2xl font-bold leading-none tracking-tighter">
                {product.name}
            </h1>
            <div className="flex gap-2.5 justify-start items-center">
                {product.stock > 0 ? (
                    <span className="px-2 py-1 bg-(--accent-col) font-medium rounded-full">
                        In Stock
                    </span>
                ) : (
                    <span className="px-2 py-1 bg-(--inv3-col) font-medium rounded-full">
                        Out of Stock
                    </span>
                )}
                <span>{product.category}</span>
            </div>

            <p className="text-(--icon-col) font-semibold text-lg leading-none w-1/2">
                {product.description}
            </p>

            <div className="mt-7.5 flex gap-2.5 items-center select-none">
                <span className={`font-semibold text-2xl text-(--accent-col) ${product.stock === 0 ? "text-(--background-sec)" : ""}`}>
                    {formatPrice(product.price)}
                </span>

                <button type='button' disabled={product.stock === 0} className="font-semibold flex justify-around items-center gap-2.5 rounded-full border-2 border-(--background-sec) w-fit p-0.5 cursor-pointer enabled:active:scale-95 duration-300 ease-out transition-transform disabled:scale-100 disabled:opacity-40">
                    <span className="text-sm flex justify-center items-center text-(--icon-col) pl-2.5">
                        Add to Cart
                    </span>
                    <div className="w-fit bg-(--background-sec) flex justify-center items-center text-lg p-2.5 rounded-full cursor-pointer">
                        <Plus
                            strokeWidth={3}
                            className="flex justify-center items-center"
                        />
                    </div>
                </button>
            </div>
        </div>
    )
}
