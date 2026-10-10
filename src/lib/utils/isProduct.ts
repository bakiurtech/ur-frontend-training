import type { Product } from "@/types/product";

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