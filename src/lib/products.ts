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