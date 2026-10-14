import { Product } from '@/types/product'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/formatPrice'
import Link from 'next/link'

type Props = {
    product: Product
    priority?: boolean
}

export function ProductCard({ product, priority = false }: Props) {
    return (
        <div className="relative">
            <svg width="0" height="0" className="absolute">
                <clipPath id="pro-card" clipPathUnits="objectBoundingBox">
                    <path
                        d="
                    M 0.15 0
                    L 0.8 0
                    Q 1 0 1 0.2
                    L 1 0.7
                    Q 1 0.8 0.9 0.8
                    Q 0.8 0.8 0.8 0.9
                    Q 0.8 1 0.7 1
                    L 0.2 1
                    Q 0 1 0 0.8
                    L 0 0.15
                    Q 0 0 0.15 0
                    Z"
                    />
                </clipPath>
            </svg>

            <Link href={`/dashboard/products/${product.id}`}>
                <div
                    className="relative aspect-square w-full overflow-hidden rounded-lg bg-(--prod-card) group hover:bg-(--accent-col) duration-300 ease-out transition-colors cursor-pointer"
                    style={{ clipPath: 'url(#pro-card)' }}
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        loading="eager"
                        priority={priority}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center scale-70"
                    />

                    <div className="w-full h-full relative">
                        <div className="absolute left-5 top-5 flex flex-col justify-center items-start group-hover:text-background w-[70%] gap-1.5 text-left">
                            <span className="font-bold w-full line-clamp-2">
                                {product.name}
                            </span>
                            <span className=" text-(--accent-col) group-hover:opacity-50 group-hover:text-background">
                                {formatPrice(product.price)}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <button
                value={product.id}
                className="bg-(--prod-plus-btn) h-[20%] aspect-square rounded-full absolute right-0 bottom-0 z-10 scale-90 origin-bottom-right flex justify-center items-center group hover:bg-(--accent-col) duration-300 transition-all ease-out active:scale-75 active:origin-center cursor-pointer"
            >
                <Plus
                    className="w-[50%] h-[50%] text-foreground"
                    strokeWidth={3}
                />
            </button>
        </div>
    )
}
