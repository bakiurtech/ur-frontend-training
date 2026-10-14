import { getInventorySummary } from "@/lib/products";
import type { Product } from "@/types/product"
import { InventoryCard } from "../products/InventoryCard";
import { formatPrice } from "@/lib/utils/formatPrice";

type Props = {
  productList: Product[];
}

export function DashboardInventory({ productList }: Props) {
  
  const {totalProducts, activeProducts, outOfStock, totalStockValue} = getInventorySummary(productList);

  const stockValue = formatPrice(totalStockValue);

  return(
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      <InventoryCard data={totalProducts} type={"Total Products"} className={"bg-(--inv1-col)"}/>
      <InventoryCard data={activeProducts} type={"Active Products"} className={"bg-(--inv2-col)"}/>
      <InventoryCard data={outOfStock} type={"Out of Stock"} className={"bg-(--inv3-col)"}/>
      <InventoryCard data={stockValue} type={"Stock Value"} className={"bg-(--inv4-col)"}/>
    </div>
  )
}