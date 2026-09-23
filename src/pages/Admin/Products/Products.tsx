import { useNavigate } from "react-router-dom"
import Button from "../../../components/ui/Button"
import AdminPagesHeader from "../../../features/admin/components/AdminPagesHeader"
import { ProductSummaryData, type ProductSummaryDataType } from "../../../static/ProductsStats"
import StatsCard from "../../../features/admin/components/StatsCard"
import FindProducts from "../../../features/admin/components/FindProducts"
import { useGetProducts, useGetProductsStats } from "../../../features/admin/api/admin.queries"
import type { ProductType } from "../../../types/Product"
import Pagination from "../../../components/Pagination"
import { useState } from "react"
import { useDeactivateProduct } from "../../../features/admin/api/admin.mutations"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
// import { useState } from "react"

function Products() {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const { data, isLoading, error } = useGetProducts(page, search, 10)
    const { mutate: deactiveProduct, isPending } = useDeactivateProduct()
    const { data: productsStats, isLoading: productsStatsLoading, error: productsStatsError } = useGetProductsStats()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    //handleViewCustomer
    const handleViewProduct = (productID: string) => {
        navigate(`/dashboard/products/${productID}`)
    }

    //handleFindProduct
    const handleFindProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        let searchVal = e.target.value
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
                    <Button children={'+ Add Product'} onClick={() => navigate('add-product')}
                        className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
                )} />


            {/* //Prodcuts Stats */}
            <div>
                {productsStatsLoading ? (
                    <div className="bg-orange-light w-full h-20 rounded-lg shadow animate-pulse grid place-items-center">
                        <p>Loading...</p>
                    </div>
                ) : productsStatsError ? (<div>
                    <div className="bg-orange-light w-full h-20 rounded-lg shadow animate-pulse grid place-items-center">
                        <p>Something went wrong!!</p>
                    </div>
                </div>) : (
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                        {productsStats.productsStats.map((item: ProductSummaryDataType) => {
                            return <StatsCard key={item.label} item={item} />
                        })}
                    </div>
                )}
            </div>


            {/* Find Products */}
            <FindProducts handleFindProduct={handleFindProduct} />


            {/* All Products */}
            <div className="bg-orange-light p-4 rounded-lg shadow grid gap-4">
                <div className="flex md:flex-row gap-4 flex-col justify-between">
                    <div className="grid gap-2">
                        <p className="font-bold">All Products</p>
                        <p className="text-[12px] text-secondary-text">1248 product records</p>
                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="text-sm table-auto min-w-200 w-full">
                        <thead className="text-left text-secondary-text uppercase text-[12px]">
                            <tr>
                                <th>product</th>
                                <th>product code</th>
                                <th>category</th>
                                <th>price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-10">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} className="py-10">
                                        Something error
                                    </td>
                                </tr>
                            ) : data && data.products.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        <span className="grid gap-2 py-10">
                                            <p className="text-center">No customer! Please add</p>
                                            <Button children={'+ Add Customer'} onClick={() => navigate('add-customer')}
                                                className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                                        </span>
                                    </td>
                                </tr>
                            ) :
                                data.products.map((item: ProductType) => {
                                    return <tr key={item.productCode} className="py-2 border-b border-secondary-text/20">
                                        <td className="py-3">{item.productName}</td>
                                        <td className="py-3">{item.productCode}</td>
                                        <td className="py-3">{item.category}</td>
                                        <td className="py-3">₹{item.price}</td>
                                        <td className="flex gap-4 items-center py-3">
                                            <button type="button" className="underline cursor-pointer"
                                                onClick={() => handleViewProduct(item._id)}>View</button>
                                            <button type="button" className="underline cursor-pointer disabled:cursor-not-allowed text-red-500" disabled={isPending}
                                                onClick={() => handleDeactivateProduct(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>
                <Pagination pagination={data?.pagination} onClick={handlePage} />
            </div>

        </div>
    )
}

export default Products