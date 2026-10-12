import { ProductsView } from '@/components/products/ProductsView'
import { getAllProducts } from '@/lib/services/fetchProduct'

export default async function ProductPage() {
    const allProducts = await getAllProducts()

    return (
        <div className="p-(--page-pad) relative">
            <ProductsView allProducts={allProducts} />
        </div>
    )
}
