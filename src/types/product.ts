// Create types/ with:
// –
// product.ts: Product, ProductCategory (union), CreateProductInput (derived with Omit), UpdateProductInput (derived with Partial).
// –
// api.ts: generic ApiResponse<T>, Paginated<T> (with items, total, page, limit), and ApiError (with statusCode, message, optional errors).
// –
// user.ts: User, UserRole, AuthTokens.

export type ProductCategory =
    'beauty'
    | 'fragrances'
    | 'furniture'
    | 'groceries'
    | 'home-decoration'
    | 'kitchen-accessories'
    | 'laptops'
    | 'mens-shirts'
    | 'mens-shoes'
    | 'mens-watches'
    | 'mobile-accessories'
    | 'motorcycle'
    | 'skin-care'
    | 'smartphones'
    | 'sports-accessories'
    | 'sunglasses'
    | 'tablets'
    | 'tops'
    | 'vehicle'
    | 'womens-bags'
    | 'womens-dresses'
    | 'womens-jewellery'
    | 'womens-shoes'
    | 'womens-watches';



export type Product = {
    id: string;
    name: string;
    sku: string;
    category: ProductCategory;
    price: number;
    stock: number;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}


export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateProductInput = Partial<CreateProductInput>;