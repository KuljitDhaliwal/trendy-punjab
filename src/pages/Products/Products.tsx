import { useNavigate } from "react-router-dom"


import StatsCard from "../../features/admin/components/StatsCard"
import FindProducts from "../../features/admin/components/FindProducts"
import { useGetProducts, useGetProductsStats } from "../../features/admin/api/admin.queries"
import type { ProductType } from "../../types/Product"
import Pagination from "../../components/Pagination"
import { useState } from "react"
import { useDeactivateProduct } from "../../features/admin/api/admin.mutations"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import useModalContext from "../../context/ModalContext"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import Button from "../../components/ui/Button"
import type { ProductSummaryDataType } from "../../static/ProductsStats"
import SkeletonCard from "../../components/ui/SkeletonCard"
import { FaCirclePlus } from "react-icons/fa6"
// import { useState } from "react"

function Products() {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const limit = 10
    const { data, isLoading, error, isFetching, isFetched, refetch } = useGetProducts(page, search, limit)
    const { mutate: deactiveProduct, isPending } = useDeactivateProduct()
    const { data: productsStats, isLoading: productsStatsLoading,
        error: productsStatsError,
        refetch: productStatsRefetch,
        isFetched: productStatsFetched,
        isFetching: productStatsIsFetching } = useGetProductsStats()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { setModal } = useModalContext()
    //handleViewCustomer
    const handleViewProduct = (productID: string) => {
        navigate(`/dashboard/products/${productID}`)
    }

    //handleFindProduct
    const handleFindProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchVal = e.target.value
        if (searchVal.length > 2) {
            setSearch(searchVal.trim())
        }
        if (searchVal === '') {
            setSearch(searchVal)
        }
    }

    //handlePage
    const handlePage = (pageNumber: number) => {
        setPage(pageNumber)
    }

    //Handle Deactivate Product
    const handleDeactivateProduct = (productID: string) => {
        deactiveProduct(productID, {
            onSuccess: () => {
                toast.success('Product deleted!')
                queryClient.invalidateQueries({
                    queryKey: ['products']
                })
            },
            onError: () => {
                toast.error('Delete product error!')
            }
        })
    }




    return (
        <div className="grid gap-6">
            <AdminPagesHeader first={'Inventery Management'}
                main={'Products'} third={'Manage your product catalog, sizes, stock and prices.'}
                right={(
                    <Button children={<span className="flex gap-2 items-center">
                                <FaCirclePlus/>
                                Add Product
                              </span>} onClick={() => navigate('add-product')}
                        className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
                )} />

            {/* //Prodcuts Stats */}
            <div>
                {productsStatsLoading && !productStatsFetched ? (
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        {Array.from({ length: 3 }, (_,index) => {
                            return <SkeletonCard key={index} />
                        })}
                    </div>
                ) : productsStatsError || (productStatsIsFetching && !productsStats) ? (
                    <div className="w-full p-4 glass-card grid place-items-center">
                        <span className="grid gap-2 w-full text-center text-xs">
                            <span>Unable to load product's stats</span>
                            <span>Something went wrong while fetching data!!</span>
                            <button onClick={() => productStatsRefetch()} disabled={productStatsIsFetching} className={
                                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                            }>
                                {productStatsIsFetching ? 'Refetching...' : 'Try again'}
                            </button>
                        </span>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        {productsStats?.productsStats?.map((item: ProductSummaryDataType) => {
                            return <StatsCard key={item.label} item={item} />
                        })}
                    </div>
                )}
            </div>


            {/* Find Products */}
            <FindProducts handleFindProduct={handleFindProduct} />


            {/* All Products */}
            <div className="p-4 glass-card grid gap-4">
                <div className="flex md:flex-row gap-4 flex-col justify-between">
                    <div className="grid gap-2">
                        <p className="font-bold">All Products</p>
                        {isLoading ? (
                            <div className="h-3 w-22 rounded-md bg-gray-200 animate-pulse" />
                        ) : (
                            <p className="text-[12px] text-secondary-text">{data?.pagination?.totalProducts} product records</p>
                        )}

                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table-auto min-w-120 w-full">
                        <thead className="text-left text-white bg-orange-dark uppercase text-[12px]">
                            <tr>
                                <th className="md:p-4 p-2 rounded-l-lg whitespace-nowrap">#</th>
                                <th className="md:p-4 p-2 whitespace-nowrap">product</th>
                                <th className="md:p-4 p-2 whitespace-nowrap">product code</th>
                                <th className="md:p-4 p-2 whitespace-nowrap">category</th>
                                <th className="md:p-4 p-2 whitespace-nowrap">price</th>
                                <th className="md:p-4 p-2 rounded-r-lg whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading && !isFetched ? (
                                Array.from({ length: 10 }, (_, index) => {
                                    return <tr key={index} className="animate-pulse py-4">
                                        <td className="py-4" colSpan={6}>
                                            <div className="bg-gray-200 h-4 rounded-md w-full" />
                                        </td>
                                    </tr>
                                })
                            ) : error || (isFetching && !data) ? (
                                <tr className="w-full">
                                    <td colSpan={7} className="py-10">
                                        <span className="grid gap-2 w-full text-center text-xs">
                                            <span>Unable to load products</span>
                                            <span>Something went wrong while fetching data!!</span>
                                            <button onClick={() => refetch()} disabled={isFetching} className={
                                                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                            }>
                                                {isFetching ? 'Refetching...' : 'Try again'}
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ) : data && data.products.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <span className="grid gap-2 py-10">
                                            <p className="text-center">No Product! Please add</p>
                                            <Button children={'+ Add Product'} onClick={() => navigate('/dashboard/products/add-product/')}
                                                className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                                        </span>
                                    </td>
                                </tr>
                            ) :
                                data.products.map((item: ProductType, key: number) => {
                                    return <tr key={item.productCode} className="py-2 border-b border-border">
                                        <td className="md:p-4 p-2 py-4">{(page - 1) * limit + key + 1}</td>
                                        <td className="md:p-4 p-2 py-4">{item.productName}</td>
                                        <td className="md:p-4 p-2 py-4">{item.productCode}</td>
                                        <td className="md:p-4 p-2 py-4">{item.category}</td>
                                        <td className="md:p-4 p-2 py-4">₹{item.price}</td>
                                        <td className="flex gap-2 items-center p-4">
                                            <button type="button" className="bg-orange-dark text-white py-1 px-2 active:scale-95 rounded-md cursor-pointer"
                                                onClick={() => handleViewProduct(item._id)}>View</button>
                                            <button type="button" className="bg-red-700 text-white py-1 px-2 disabled:cursor-not-allowed active:scale-95 rounded-md cursor-pointer" disabled={isPending}
                                                onClick={() => setModal({
                                                    type: 'delete-product',
                                                    data: {
                                                        header: 'Remove Product',
                                                        subHeading: <p>Do you want to remove {item.productName} product</p>,
                                                        actionBtn: () => handleDeactivateProduct(item._id),
                                                        actionBtnText: 'Delete'
                                                    }
                                                })}>Delete</button>
                                        </td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>
                {data?.products?.length > 0 && !error && (
                    <Pagination pagination={data?.pagination} onClick={handlePage} />
                )}
            </div>

        </div>
    )
}

export default Products