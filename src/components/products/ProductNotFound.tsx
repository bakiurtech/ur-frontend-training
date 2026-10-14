import Image from 'next/image'

type Props = {
    onClear: () => void
}

export function ProductNotFound({
    onClear
}: Props) {

    return (
        <div className="flex-1 w-full custom-layout rounded-[50px] flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex flex-col justify-center items-center gap-2.5">
                <Image
                    src="/ghost.svg"
                    alt="ghost"
                    width={120}
                    height={120}
                    loading='eager'
                    className="w-24 sm:w-28 md:w-32 h-auto object-contain object-center"
                />
                <span className="opacity-40">No product found</span>
            </div>
            <button onClick={onClear} className='bg-(--accent-col) px-3.5 py-2.5 rounded-xl cursor-pointer duration-300 transition-all ease-out active:scale-75 font-semibold'>Clear Filters</button>
        </div>
    )
}
