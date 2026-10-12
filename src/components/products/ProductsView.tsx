'use client'
import { useState } from 'react'
import type { ProductCategory, Product } from '@/types/product'
import { filterByCategory, searchProducts, sortProducts } from '@/lib/products'
import { ProductBanner } from './ProductBanner'
import { ProductList } from './ProductList'
import { Pagination } from '../Pagination'
import { ProductNotFound } from './ProductNotFound'

const limit = 20

type SortField = 'name' | 'price' | 'createdAt'
type SortDir = 'asc' | 'desc'

type Props = { 
    allProducts: Product[] 
}


export function ProductsView({ allProducts }: Props) {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState<ProductCategory>("all")
    const [sort, setSort] = useState('name-asc')
    const [page, setPage] = useState(1)

    const [field, dir] = sort.split('-') as [SortField, SortDir] 

    const searched = searchProducts(allProducts, search)
    const categoryFiltered = filterByCategory(searched, category);
    const sorted = sortProducts(categoryFiltered, field, dir)

    const total = sorted.length
    const totalPage = Math.max(1, Math.ceil(total / limit))
    const currPage = Math.min(page, totalPage)

    const skip = (currPage - 1) * limit
    const products = sorted.slice(skip, skip + limit)

    const handleSearch = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    const handleCategory = (value: string) => {
        setCategory(value as ProductCategory)
        setPage(1)
    }

    const handleSort = (value: string) => {
        setSort(value)
        setPage(1)
    }

    return (
        <div className="flex flex-col gap-2.5 min-h-[calc(100svh-20px)]">
            <ProductBanner
                productList={products}
                search={search}
                onSearchChange={handleSearch}
                category={category}
                onCategoryChange={handleCategory}
                sort={sort}
                onSortChange={handleSort}
            />
            {total === 0 ? (
                <ProductNotFound 
                    onSearchChange={handleSearch}
                    onCategoryChange={handleCategory}
                    onSortChange={handleSort}
                />
            ) : (
                <div className="flex-1 relative">
                    <ProductList productList={products} />
                    <Pagination
                        currPage={currPage}
                        totalPage={totalPage}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    )
}
