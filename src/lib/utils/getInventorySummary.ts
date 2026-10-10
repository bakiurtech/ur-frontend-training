import type { Product } from "@/types/product";

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