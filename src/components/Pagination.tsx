import { useEffect, useState } from 'react'
import type { PaginationType } from '../pages/Admin/Customers'


type PaginationTypeProps = {
    pagination: PaginationType,
    onClick: (page: number) => void
}

function Pagination({ pagination, onClick }: PaginationTypeProps) {

    const [ pageLimit, setPageLimit ] = useState<number>(10)

    //Handle Page
    const handlePage = (pageNumber: number) => {
        onClick(pageNumber)
    }

    //Handle Prev
    const handlePrev = (pageNumber: number) => {
        onClick(pageNumber)
    }

    useEffect(() => {
        const handlePageLimit = () => {
            if (window.innerWidth <= 768) {
                setPageLimit(5)
            }else{
                setPageLimit(10)
            }
        }
        handlePageLimit()
        window.addEventListener('resize', handlePageLimit)

        return ()=>{
            window.removeEventListener('resize', handlePageLimit)
        }
    }, [])


    console.log('PageLimit', pageLimit)



    return (
        <div className="w-full py-4 flex gap-4 items-center justify-center text-sm">
            <button onClick={() => handlePrev(Number(pagination.currentPage) - 1)} disabled={Number(pagination?.currentPage) <= 1}
                className={`disabled:text-gray-400 disabled:cursor-not-allowed font-bold disabled:font-normal`}>prev</button>
            {Array.from({ length: pagination?.totalPages > 2 ? 2 : pagination?.totalPages }, (_, index) => {
                const pageNumber: number = index + 1;
                return (
                    <button key={index} onClick={() => handlePage(pageNumber)}
                        className={`font-bold ${Number(pagination.currentPage) === pageNumber ? 'bg-orange-dark text-white' : ''}  rounded-full w-8 h-8 cursor-pointer`}>
                        {pageNumber}
                    </button>
                )
            })}
            <button onClick={() => handlePrev(Number(pagination.currentPage) + 1)} disabled={Number(pagination?.currentPage) >= pagination?.totalPages}
                className={`disabled:text-gray-400 disabled:cursor-not-allowed font-bold disabled:font-normal`}>next</button>
        </div>
    )
}

export default Pagination