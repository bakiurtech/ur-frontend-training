import { Suspense } from 'react'
import { ProductsView } from '@/components/products/ProductsView'
import { getAllProducts } from '@/lib/services/fetchProduct'

export const metadata = { title: 'Products | Luminous' }

export default async function ProductPage() {
    const allProducts = await getAllProducts()

    return (
        <div className="p-(--page-pad) relative py-12.5">
            <Suspense>
                <ProductsView allProducts={allProducts} />
            </Suspense>
        </div>
    )
}