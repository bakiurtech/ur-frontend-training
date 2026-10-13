import type { Product } from '@/types/product'
import { isProduct } from '../utils/isProduct'

const api = process.env.API_BASE_URL

type DummyItem = {
    id: number
    title: string
    sku: string
    category: string
    price: number
    stock: number
    description: string
    meta?: {
        createdAt?: string
        updatedAt?: string
    }
    images: string[]
    thumbnail: string
}

type DummyResponse = {
    products: DummyItem[]
    total: number
}

export async function getAllProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${api}/products?limit=0`, 
            {
                next: { revalidate: 3600 },
            }
        )
        if (!response.ok) {
            throw new Error('failed to load products')
        }

        const data = (await response.json()) as DummyResponse

        const mapped: unknown[] = data.products.map((item) => ({
            id: String(item.id),
            name: item.title,
            sku: item.sku,
            category: item.category,
            price: item.price,
            stock: item.stock,
            description: item.description,
            isActive: item.stock > 0,
            createdAt: item.meta?.createdAt ?? new Date().toISOString(),
            updatedAt: item.meta?.updatedAt ?? new Date().toISOString(),
            images: item.images,
            thumbnail: item.thumbnail,
        }))

        return mapped.filter(isProduct)
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        throw new Error('Network error')
    }
}