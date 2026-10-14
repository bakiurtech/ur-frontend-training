'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
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
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const search = searchParams.get('search') ?? ''
    const category = (searchParams.get('category') ?? 'all') as ProductCategory
    const sort = searchParams.get('sort') ?? 'name-asc'
    const page = Number(searchParams.get('page')) || 1

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, value] of Object.entries(updates)) {
            if (value === null || value === '') params.delete(key)
            else params.set(key, value)
        }
        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    }

    const [field, dir] = sort.split('-') as [SortField, SortDir]

    const searched = searchProducts(allProducts, search)
    const categoryFiltered = filterByCategory(searched, category)
    const sorted = sortProducts(categoryFiltered, field, dir)

    const total = sorted.length
    const totalPage = Math.max(1, Math.ceil(total / limit))
    const currPage = Math.min(page, totalPage)

    const skip = (currPage - 1) * limit
    const products = sorted.slice(skip, skip + limit)

    const handleSearch = (value: string) =>
        updateParams({ search: value, page: null })

    const handleCategory = (value: string) =>
        updateParams({ category: value === 'all' ? null : value, page: null })

    const handleSort = (value: string) =>
        updateParams({ sort: value === 'name-asc' ? null : value, page: null })

    const handlePage = (n: number) =>
        updateParams({ page: n === 1 ? null : String(n) })

    const handleClear = () =>
        updateParams({ search: null, category: null, sort: null, page: null })

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
                    onClear={handleClear}
                />
            ) : (
                <div className="flex-1 relative">
                    <ProductList productList={products} />
                    <Pagination
                        currPage={currPage}
                        totalPage={totalPage}
                        onPageChange={handlePage}
                    />
                </div>
            )}
        </div>
    )
}
