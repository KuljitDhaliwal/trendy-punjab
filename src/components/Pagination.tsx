import type { PaginationType } from '../pages/Admin/Customers'


type PaginationTypeProps = {
    pagination: PaginationType,
    onClick: (page: number)=> void
}

function Pagination({pagination, onClick}: PaginationTypeProps) {

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
        <button onClick={()=>handlePrev(pagination.currentPage - 1)} className={`${pagination?.currentPage <= 1 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'} font-bold`}>prev</button>
        {Array.from({length: pagination?.totalPages}, (_, index)=>{
            const pageNumber: number = index + 1;
            return (
                <button key={index} onClick={()=>handlePage(pageNumber)}
                className={`font-bold ${pagination.currentPage === pageNumber ? 'bg-orange-dark text-white' : ''}  rounded-full w-8 h-8 cursor-pointer`}>
                    {pageNumber}
                </button>
            )
        })}
        <button onClick={()=>handlePrev(pagination.currentPage + 1)}
        className={`${pagination?.currentPage < pagination?.totalPages ? 'cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}>next</button>
    </div>
  )
}

export default Pagination