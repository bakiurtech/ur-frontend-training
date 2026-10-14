'use client'
import type { Product } from '@/types/product'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    product: Product
}

export function ProductSingle({ product }: Props) {
    const totalImg = product?.images.length
    const [imgIndex, setImgIndex] = useState(0)

    let maximum = 0

    if (totalImg > 1) {
        maximum = Math.min(2, totalImg - 1)
    }

    const nextIndexes: number[] = []

    for (let k = 1; k <= maximum; k++) {
        const index = (imgIndex + k) % totalImg
        nextIndexes.push(index)
    }

    function handleIndexUp() {
        setImgIndex((prev) => (prev + 1) % totalImg)
    }

    return (
        <div className="relative h-full flex justify-between items-end gap-2.5">
            <div className="relative h-full aspect-square">
                <svg width="0" height="0" className="absolute">
                    <clipPath
                        id="pro-single-card"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path
                            d="M 0.2 0
                    L 0.8 0
                    Q 1 0 1 0.2
                    L 1 0.7
                    Q 1 0.8 0.9 0.8
                    Q 0.8 0.8 0.8 0.9
                    Q 0.8 1 0.7 1
                    L 0.2 1
                    Q 0 1 0 0.8
                    L 0 0.2
                    Q 0 0 0.2 0
                    Z"
                        />
                    </clipPath>
                </svg>

                <div
                    className="relative h-full aspect-square overflow-hidden rounded-lg bg-(--prod-card)"
                    style={{ clipPath: 'url(#pro-single-card)' }}
                >
                    {product.images.map((src, i) => (
                        <Image
                            key={src}
                            src={src}
                            alt={`${product.name} ${i + 1}`}
                            fill
                            priority={i === 0}
                            loading='eager'
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw"
                            className={`object-cover object-center scale-100 transition-opacity duration-300 ${
                                i === imgIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}
                </div>

                <button
                    disabled = {totalImg === 1}
                    type="button"
                    onClick={handleIndexUp}
                    className="bg-(--prod-plus-btn) h-[20%] aspect-square rounded-full absolute right-0 bottom-0 z-10 scale-90 origin-bottom-right flex justify-center items-center enabled:hover:bg-(--accent-col) duration-300 transition-all ease-out active:scale-75 active:origin-center cursor-pointer disabled:active:scale-90 disabled:origin-bottom-right"
                >
                    <ChevronRight
                        className={`w-[50%] h-[50%] text-foreground ${totalImg === 1 ? "opacity-40" : ""}`}
                        strokeWidth={3}
                    />
                </button>
            </div>

            {totalImg > 1 && (
                <div className="flex-1 h-[40%] w-full flex justify-start items-center gap-2.5">
                    {nextIndexes.map((index) => (
                        <div
                            key={index}
                            onClick={() => setImgIndex(index)}
                            className="relative h-full aspect-square rounded-[42px] bg-(--background-sec) overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={product.images[index]}
                                alt={`${product.name} ${index + 1}`}
                                fill
                                loading='eager'
                                sizes="100px"
                                className="object-cover object-center"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
