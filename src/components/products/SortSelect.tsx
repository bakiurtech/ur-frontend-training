import { ChevronDown } from 'lucide-react'

type Props = {
    value: string
    onChange: (value: string) => void
}

export function SortSelect({ value, onChange }: Props) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none rounded-full bg-transparent border-2 border-(--btn-border)/25 py-1 text-sm px-2 md:text-[16px] md:pl-4 md:pr-10 text-(--place-col)/50 outline-none [&>option]:bg-white [&>option]:text-(--place-col)"
            >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
                <option value="createdAt-desc">Newest first</option>
                <option value="createdAt-asc">Oldest first</option>
            </select>
            <ChevronDown
                size={18}
                className="pointer-events-none absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-(--place-col)/50"
            />
        </div>
    )
}