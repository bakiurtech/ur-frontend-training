import type { Product, ProductCategory } from "@/types/product";

// searchProducts(products, query)
export const searchProducts = (products: Product[], query?: string): Product[] => {
    const q = (query ?? "").toLowerCase().trim();
    if(!q) return products;

    return products.filter(
        (product) =>
            product.name.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q)
    );
}


// filterByCategory(products, category)
export const filterByCategory = (products: Product[], category: ProductCategory | "all" = "all"): Product[] => {
    if(category === "all") return products;
    
    return products.filter(
        (product) => 
            product.category === category
    );
}

// sortProducts(products, field, direction)
export const sortProducts = (
    products: Product[], 
    field: "price" | "name" | "createdAt", 
    direction: "asc" | "desc" = "asc"): Product[] => {
    const copy = [...products];

    if(field === "price"){
        return (direction === "asc") 
            ? copy.sort((a, b) => a.price - b.price)
            : copy.sort((a, b) => b.price - a.price);
    }

    if(field === "name"){
        return (direction === "asc")
            ? copy.sort((a, b) => a.name.localeCompare(b.name))
            : copy.sort((a, b) => b.name.localeCompare(a.name));
    }

    return (direction === "asc")
        ? copy.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
        : copy.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

}

type InventorySummary = {
    totalProducts: number;
    activeProducts: number;
    outOfStock: number;
    totalStockValue: number;
};

// getInventorySummary(products): returns { totalProducts, activeProducts, outOfStock, totalStockValue } using reduce.
export const getInventorySummary = (products: Product[]): InventorySummary => {

    const activeList = products.filter((product) => product.isActive);
    const outStock = products.filter((product) => product.stock === 0);

    const totalProducts = products.length;
    const activeProducts = activeList.length;
    const outOfStock = outStock.length;

    const totalStockValue = products.reduce(
        (acc, curr) => (acc + (curr.price * curr.stock)),
        0
    );

    return {
        totalProducts: totalProducts,
        activeProducts: activeProducts,
        outOfStock: outOfStock,
        totalStockValue: totalStockValue
    };
};





// formatPrice(amount): returns ₹1,299.00 style strings with Intl.NumberFormat('en-IN', ...)
export const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-IN',{
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}





export function isProduct(value: unknown): value is Product {

    if (typeof value !== "object" || value === null) return false;

    const v = value as Record<string, unknown>;

    return (
        typeof v.id === "string" &&
        typeof v.name === "string" &&
        typeof v.sku === "string" &&
        typeof v.category === "string" &&
        typeof v.price === "number" &&
        typeof v.stock === "number" &&
        (v.description === undefined || typeof v.description === "string") &&
        typeof v.isActive === "boolean" &&
        typeof v.createdAt === "string" &&
        typeof v.updatedAt === "string"
    );
}







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
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error("Network error");
    }

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
};
