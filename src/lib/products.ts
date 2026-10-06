// searchProducts(products, query)
export const searchProducts = (products, query) => {
    const q = (query ?? "").toLowerCase().trim();
    if(!q) return products;

    return products.filter(
        (product) =>
            product.name.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q)
    );
}


// filterByCategory(products, category)
export const filterByCategory = (products, category="all") => {
    if(category === "all") return products;
    
    return products.filter(
        (product) => 
            product.category === category
    );
}


// sortProducts(products, field, direction)
export const sortProducts = (products, field, direction="asc") => {
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

    if(field === "createdAt"){
        return (direction === "asc")
            ? copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            : copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
}



// getInventorySummary(products): returns { totalProducts, activeProducts, outOfStock, totalStockValue } using reduce.
export const getInventorySummary = (products) => {

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
export const formatPrice = (amount) => {
    return Intl.NumberFormat('en-IN',{
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}


// fetchProducts(): an async function that loads products from https://dummyjson.com/products
export const fetchProducts = async () => {
    let response;

    try {
        response = await fetch("https://dummyjson.com/products");
    } catch (err) {
        throw new Error(err.message);
    }

    if (!response.ok) {
        throw new Error("failed to load products");
    }

    const data = await response.json();

    return data.products.map((item) => ({
        id: item.id,
        name: item.title,
        category: item.category,
        price: item.price,
        stock: item.stock,
        isActive: item.stock > 0,
        createdAt: item.meta?.createdAt || new Date().toISOString(),
    }));
};
