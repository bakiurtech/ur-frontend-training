'use client'

type Props = {
    currPage: number
    totalPage: number
    onPageChange: (page: number) => void
}

export function Pagination({ currPage, totalPage, onPageChange }: Props) {
    const goToPage = (page: number) => {
        onPageChange(page)
        window.scrollTo({ top: 0 })
    }

    return (
        <div className="flex justify-center items-center gap-5 my-12.5">
            <button
                disabled={currPage <= 1}
                onClick={() => goToPage(currPage - 1)}
                className="disabled:opacity-40 disabled:cursor-default cursor-pointer hover:text-(--accent-col)"
            >
                Prev
            </button>

            <span>
                {currPage} / {totalPage}
            </span>

            <button
                disabled={currPage >= totalPage}
                onClick={() => goToPage(currPage + 1)}
                className="disabled:opacity-40 disabled:cursor-default cursor-pointer hover:text-(--accent-col)"
            >
                Next
            </button>
        </div>
    )
}