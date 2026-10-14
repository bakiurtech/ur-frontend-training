
type Props = {
    data: number | string;
    type: string;
    className?: string;
}

export function InventoryCard({ data, type, className = "" } : Props) {
    return(
        <div className={`text-xl rounded-2xl md:rounded-4xl h-25 md:h-40 relative ${className}`}>
            <span className="absolute top-3.5 left-3.5 text-sm lg:text-base font-medium text-(--inv-txt) text-left">{type}</span>
            <span className="absolute right-3.5 bottom-3.5 text-xl lg:text-2xl font-semibold text-(--inv-txt) text-right">{data}</span>
        </div>
    )
}