import { DashboardInventory } from "@/components/dashboard/DashboardInventory"
import { getAllProducts } from "@/lib/services/fetchProduct"

export const metadata = { title: 'Dashboard | Luminous' }

export default async function Dashboard() {
    const productList = await getAllProducts();

    return( 
        <div className="py-12.5 p-2.5 w-full max-w-7xl mx-auto flex flex-col justify-start items-center">
            <h1 className="text-(--icon-col) text-9xl font-thin tracking-tighter uppercase leading-none select-none mask-[linear-gradient(to_bottom,black,transparent)] text-center">Lumin<span className="text-(--accent-col)">o</span>us</h1>
            <DashboardInventory productList={productList}/>
        </div>
    )
}
