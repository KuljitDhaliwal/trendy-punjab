import { useNavigate } from "react-router-dom"
import Button from "../../../components/ui/Button"
import AdminPagesHeader from "../../../features/admin/components/AdminPagesHeader"
import { ProductSummaryData, type ProductSummaryDataType } from "../../../static/ProductsStats"
import StatsCard from "../../../features/admin/components/StatsCard"
import FindProducts from "../../../features/admin/components/FindProducts"
import { useGetProducts } from "../../../features/admin/api/admin.queries"
import type { ProductType } from "../../../types/Product"
import Pagination from "../../../components/Pagination"
import { useState } from "react"
// import { useState } from "react"

function Products() {
    const [page, setPage] = useState<number>(1)
    const { data, isLoading, error } = useGetProducts(page, '', 10)
    const navigate = useNavigate()


    //handleViewCustomer
    const handleViewCustomer = (id: string) => {
        console.log(id)
    }

    //handlePage

    const handlePage = (pageNumber: number) => {
        console.log('Cjecl page', pageNumber)
        setPage(pageNumber)
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
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                {ProductSummaryData.map((item: ProductSummaryDataType) => {
                    return <StatsCard key={item.label} item={item} />
                })}
            </div>


            {/* Find Products */}
            <FindProducts />


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
                                    return <tr key={item.productName} className="py-2 border-b border-secondary-text/20">
                                        <td className="py-3">{item.productName}</td>
                                        <td className="py-3">{item.productCode}</td>
                                        <td className="py-3">{item.category}</td>
                                        <td className="py-3">₹{item.price}</td>
                                        <td><button type="button" className="underline cursor-pointer"
                                            onClick={() => handleViewCustomer(item._id)}>View</button></td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>
                <Pagination pagination={data?.pagination} onClick={handlePage}/> 
            </div>

        </div>
    )
}

export default Products