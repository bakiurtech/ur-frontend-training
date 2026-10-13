import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-full h-svh p-2.5 relative">
            <div className="relative w-full h-full">
                <Image
                    src="/404-main.png"
                    alt="page not found"
                    loading="eager"
                    fill
                    quality={95}
                    sizes='100vw'
                    className="rounded-[50px] object-cover object-center"
                />
            </div>

            <Link
              href="/">
                <button className="bg-(--background-sec) hover:bg-(--accent-col) absolute flex justify-center items-center bottom-5 left-1/2 -translate-x-1/2 p-2.5 rounded-full cursor-pointer duration-300 ease-out transition-colors">
                    <Home className="text-foreground" />
                </button>
            </Link>
        </div>
    )
}
