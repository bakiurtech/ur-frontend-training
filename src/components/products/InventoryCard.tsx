
type Props = {
    data: number | string;
    type: string;
    className?: string;
}

export function InventoryCard({ data, type, className = "" } : Props) {
    return(
        <div className={`text-xl rounded-2xl md:rounded-4xl h-25 md:h-40 relative ${className}`}>
            <span className="absolute top-2.5 left-2.5 text-sm lg:text-[16px] font-semibold text-(--inv-txt) text-left">{type}</span>
            <span className="absolute right-2.5 bottom-2.5 text-lg lg:text-xl font-semibold text-(--inv-txt) text-right">{data}</span>
        </div>
    )
}