'use client'

import { CloudAlert } from 'lucide-react'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: Props) {
    return (
        <div className="w-full h-svh flex flex-col justify-center items-center gap-2.5">
            <CloudAlert className="w-8 h-8 animate-pulse" />
            <button
                onClick={reset}
                className="bg-(--accent-col) px-3.5 py-2.5 rounded-xl cursor-pointer duration-300 transition-all ease-out active:scale-75 font-semibold"
            >
                Try Again
            </button>
        </div>
    )
}
