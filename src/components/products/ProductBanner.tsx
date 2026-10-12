'use client'
import Image from 'next/image'
import { Inventory } from './Inventory'
import { SearchBar } from './SearchBar'
import { SortSelect } from './SortSelect'
import type { Product } from '@/types/product'
import { CategoryFilter } from './CategoryFilter'

type Props = {
    productList: Product[]
    search: string
    onSearchChange: (value: string) => void
    category: string
    onCategoryChange: (value: string) => void
    sort: string
    onSortChange: (value: string) => void
}

export function ProductBanner({
    productList,
    search,
    onSearchChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
}: Props) {
    return (
        <div className="custom-layout w-full flex flex-col md:flex-row justify-between items-stretch gap-2.5 md:h-82.5">
            <div className="relative h-65 w-full overflow-hidden rounded-[50px] md:h-auto md:flex-2">
                <Image
                    src="/nice.png"
                    alt="banner"
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, 75vw"
                    quality={95}
                    className="object-cover object-top-left"
                />

                <div className="absolute inset-0 z-10 flex items-end gap-2.5 p-5">
                    <SearchBar value={search} onChange={onSearchChange} />
                    <CategoryFilter value={category} onChange={onCategoryChange}/>
                    <SortSelect value={sort} onChange={onSortChange} />
                </div>
            </div>
            <Inventory productList={productList} />
        </div>
    )
}