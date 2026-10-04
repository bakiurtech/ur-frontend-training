import products from "@/data/products.json"
import {
    searchProducts,
    filterByCategory,
    sortProducts,
    getInventorySummary,
    formatPrice,
    fetchProducts,
} from "@/lib/products"

export default async function Home(){
    const query = "  BOok  ";
    const category = "fitness";

    const summary = getInventorySummary(products);
    const searchResults = searchProducts(products, query);
    const filteredProducts = filterByCategory(products, category);
    const sortedByPrice = sortProducts(products, 'price', 'desc');

    return (
        <div>
            <h1>Md. Al Baki Akon</h1>
            <p>ShopDesk – training app</p>

            <br />
            <br />
            <br />
            <h2>Product List</h2>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border">
                        <h3>{product.name}</h3>
                        <p>{product.category}</p>
                        <p>{formatPrice(product.price)}</p>
                        <p>{product.stock > 0 ? 'in stock' : 'out of stock'}</p>
                    </div>
                ))}
            </div>

            <br />
            <br />
            <br />
            <h2>Inventory summary</h2>
            <ul>
                <li>Total products: {summary.totalProducts}</li>
                <li>Active products: {summary.activeProducts}</li>
                <li>Out of stock: {summary.outOfStock}</li>
                <li>
                    Total stock value: {formatPrice(summary.totalStockValue)}
                </li>
            </ul>

            <br />
            <h2>Search: {query.toLowerCase().trim()}</h2>
            <ul>
                {searchResults.map((product) => (
                    <li key={product.id}>
                        {product.name} – {formatPrice(product.price)}
                    </li>
                ))}
            </ul>

            <br />
            <h2>Category: {category}</h2>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} – {formatPrice(product.price)}
                    </li>
                ))}
            </ul>

            <br />
            <h2>Sorted by price (high to low)</h2>
            <ul>
                {sortedByPrice.map((product) => (
                    <li key={product.id}>
                        {product.name} – {formatPrice(product.price)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
