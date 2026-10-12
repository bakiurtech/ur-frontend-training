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
export const filterByCategory = (products: Product[], category: ProductCategory): Product[] => {
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





// inventory summary
type InventorySummary = {
    totalProducts: number;
    activeProducts: number;
    outOfStock: number;
    totalStockValue: number;
};

// getInventorySummary(products): returns { totalProducts, activeProducts, outOfStock, totalStockValue } using reduce.
export const getInventorySummary = (products: Product[]): InventorySummary => {

    const activeList = products.filter((product) => product.isActive);

    const totalProducts = products.length;
    const activeProducts = activeList.length;
    const outOfStock = totalProducts - activeProducts;

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