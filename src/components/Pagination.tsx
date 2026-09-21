import type { PaginationType } from '../pages/Admin/Customers'


type PaginationTypeProps = {
    pagination: PaginationType,
    onClick: (page: number)=> void
}

function Pagination({pagination, onClick}: PaginationTypeProps) {
    console.log('pageination', pagination)
    //Handle Page
    const handlePage = (pageNumber: number) => {
        onClick(pageNumber)
    }

    //Handle Prev
    const handlePrev = (pageNumber: number) => {
        onClick(pageNumber)
    }

  return (
    <div className="w-full py-4 flex gap-4 items-center justify-center text-sm">
        <button onClick={()=>handlePrev(pagination.currentPage - 1)} disabled={pagination?.currentPage <= 1}
        className={`disabled:text-gray-400 disabled:cursor-not-allowed font-bold disabled:font-normal`}>prev</button>
        {Array.from({length: pagination?.totalPages}, (_, index)=>{
            const pageNumber: number = index + 1;
            return (
                <button key={index} onClick={()=>handlePage(pageNumber)}
                className={`font-bold ${pagination.currentPage === pageNumber ? 'bg-orange-dark text-white' : ''}  rounded-full w-8 h-8 cursor-pointer`}>
                    {pageNumber}
                </button>
            )
        })}
        <button onClick={()=>handlePrev(pagination.currentPage + 1)} disabled={pagination?.currentPage >= pagination?.totalPages}
        className={`disabled:text-gray-400 disabled:cursor-not-allowed font-bold disabled:font-normal`}>next</button>
    </div>
  )
}

export default Pagination