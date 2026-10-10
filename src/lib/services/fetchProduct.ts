import type { Product } from "@/types/product";
import { isProduct } from "../utils/isProduct";

type DummyItem = {
    id: number;
    title: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    meta?: {
        createdAt?: string;
        updatedAt?: string;
    };
};


type DummyResponse = {
    products: DummyItem[];
};


export const fetchProducts = async (): Promise<Product[]> => {
    let response: Response;

    try {
        response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error("failed to load products");
        }

        const data = (await response.json()) as DummyResponse;

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
        }));

        return mapped.filter(isProduct);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error("Network error");
    }
};
