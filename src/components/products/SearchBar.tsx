import { Search } from 'lucide-react'

type Props = {
    value: string
    onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <div className="absolute top-5 right-5">
            <Search
                size={18}
                strokeWidth={3}
                className="pointer-events-none absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-(--accent-col)"
            />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search Products..."
                className="rounded-full bg-transparent border-2 border-(--btn-border)/25 py-1 md:py-1.5 pl-10 pr-2 md:pr-4 text-background placeholder:text-(--place-col)/50 outline-none"
            />
        </div>
    )
}
