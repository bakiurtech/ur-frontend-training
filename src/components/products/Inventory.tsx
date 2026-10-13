import { getInventorySummary } from "@/lib/products";
import type { Product } from "@/types/product"
import { InventoryCard } from "./InventoryCard";
import { formatPrice } from "@/lib/utils/formatPrice";

type Props = {
  productList: Product[];
}

export function Inventory({ productList }: Props) {
  
  const {totalProducts, activeProducts, outOfStock, totalStockValue} = getInventorySummary(productList);

  const stockValue = formatPrice(totalStockValue);

  return(
    <div className="w-full md:flex-1 grid grid-cols-2 gap-2.5">
      <InventoryCard data={totalProducts} type={"Total Products"} className={"bg-(--inv1-col)"}/>
      <InventoryCard data={activeProducts} type={"Active Products"} className={"bg-(--inv2-col)"}/>
      <InventoryCard data={outOfStock} type={"Out of Stock"} className={"bg-(--inv3-col)"}/>
      <InventoryCard data={stockValue} type={"Stock Value"} className={"bg-(--inv4-col)"}/>
    </div>
  )
}