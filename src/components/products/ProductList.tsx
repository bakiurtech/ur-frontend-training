import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

type Props = {
    productList: Product[]
}

export function ProductList({ productList }: Props) {
  
    return (
        <div className="custom-layout grid grid-cols-1 min-[480px]:grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
            {productList.map((elem, index) => (
                <ProductCard key={elem.id} 
                product={elem}
                priority={index < 4} />
            ))}
        </div>
    )
}