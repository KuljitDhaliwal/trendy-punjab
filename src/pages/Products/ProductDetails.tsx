import { IoIosArrowBack } from "react-icons/io"
import Button from "../../components/ui/Button"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { useNavigate, useParams } from "react-router-dom"
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter"
import { useDeactivateProduct, useGetProduct } from "../../features/admin/api/admin.mutations"
import { useEffect, useState } from "react"
import type { ProductType } from "../../types/Product"
import { toast } from "react-toastify"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { IoShirtOutline } from "react-icons/io5"
import { useGetProductStats } from "../../features/admin/api/admin.queries"

import StatsCard from "../../features/admin/components/StatsCard"
import { useQueryClient } from "@tanstack/react-query"
import useModalContext from "../../context/ModalContext"
import type { CustomerStats } from "../Admin/Customers"
import SkeletonCard from "../../components/ui/SkeletonCard"



function ProductDetails() {
    const navigate = useNavigate()
    const { productID } = useParams()
    const { mutate: getProduct, isPending, error } = useGetProduct()
    const { mutate: deactiveProduct, isPending: deactiveProductLoading } = useDeactivateProduct()
    const { setModal } = useModalContext()
    const {
        data: productStatsData,
        error: productStatsError,
        isLoading: productStatsLoading,
        isFetched: productStatsIsFetched,
        isFetching: productStatsIsFetching,
        refetch: productStatsRefetch
    } = useGetProductStats(productID || '')
    const [product, setProduct] = useState<ProductType>()
    const queryClient = useQueryClient()

    //Get Product
    const getProductData = () => {
        if (productID) {
            getProduct(productID, {
                onSuccess: (data) => {
                    setProduct(data.product)
                },
                onError: (error) => {
                    toast.error(error.message)
                }
            })
        }
    }


    //Get Product
    useEffect(() => {
        getProductData()
    }, [productID])





    //Handle View Product
    const handleEditProduct = () => {
        navigate(`/dashboard/products/edit-product/${productID}`)
    }




    //Handle Deactivate Product
    const handleDeactivateProduct = (productID: string) => {
        deactiveProduct(productID, {
            onSuccess: () => {
                toast.success('Product deleted!')
                queryClient.invalidateQueries({
                    queryKey: ['products']
                })
                navigate('/dashboard/products/')
            },
            onError: () => {
                toast.error('Delete product error!')
            }
        })
    }

    return (
        <div className="grid gap-6">
            <AdminPagesHeader first={'Products / Product Details'}
                main={'Product Details'} third={'Check product information, sizes, measurements and order history.'}
                right={(
                    <Button children={
                        <span className="flex gap-2 items-center">
                            <IoIosArrowBack />
                            Back to Products
                        </span>
                    } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/products/')} />
                )} />


            {/* Customer's Sizes */}
            <div className="grid md:grid-cols-2 gap-4">
                <TodayActivityLayout
                    head="Product Details"
                    btn="not"
                    detail="All information about product"
                    icon={IoShirtOutline}
                    children={(
                        <div>
                            {product || isPending ? (
                                <div className="grid gap-4">
                                    {!deactiveProductLoading ? (
                                        <div className="flex gap-4">
                                            <p className="text-lg">{product?.productName}</p>
                                            {product?.isActive && (
                                                <span className="bg-success border border-success-subtle text-white text-xs font-medium rounded grid place-items-center px-1">Active</span>
                                            )}
                                        </div>

                                    ) : (
                                        <div className="flex gap-4">
                                            <div className="w-40 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                                            <div className="w-10 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                                        </div>
                                    )}

                                    <div className="grid gap-4 ">
                                        <div className="flex gap-10 justify-between">
                                            <p className="text-secondary-text">Product Code</p>
                                            <div>
                                                {!isPending ? (
                                                    <p className="font-semibold">{product?.productCode}</p>
                                                ) : (
                                                    <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                                                )}

                                            </div>
                                        </div>
                                        <hr className="text-border" />
                                        <div className="flex gap-10 justify-between">
                                            <p className="text-secondary-text">Category</p>
                                            <div>
                                                {!isPending ? (
                                                    <p className="font-semibold">{product?.category}</p>

                                                ) : (
                                                    <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                                                )}

                                            </div>
                                        </div>
                                        <hr className="text-border" />
                                        <div className="flex gap-10 justify-between">
                                            <p className="text-secondary-text">Brand</p>
                                            <div>
                                                {!isPending ? (
                                                    <p className="font-semibold">{product?.brand}</p>

                                                ) : (
                                                    <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                                                )}
                                            </div>
                                        </div>
                                        <hr className="text-border" />
                                        <div className="flex gap-10 justify-between">
                                            <p className="text-secondary-text">Price</p>
                                            <div>
                                                {!isPending ? (
                                                    <p className="font-semibold">{product?.price}</p>

                                                ) : (
                                                    <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            ) : error ? (<div className="w-full p-4 glass-card grid place-items-center">
                                <span className="grid gap-2 w-full text-center text-xs">
                                    <span>Unable to load product's stats</span>
                                    <span>Something went wrong while fetching data!!</span>
                                    <button onClick={getProductData} disabled={productStatsIsFetching} className={
                                        `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                    }>
                                        {productStatsIsFetching ? 'Refetching...' : 'Try again'}
                                    </button>
                                </span>
                            </div>) : ('')}
                        </div>
                    )}
                />
                <TodayActivityLayout
                    head="Stock Summary"
                    btn="not"
                    detail="Product stats like stocks, variants"
                    icon={IoShirtOutline}
                    children={(
                        <div>
                            {productStatsLoading && !productStatsIsFetched ? (
                                <div className="grid gap-4 grid-cols-2">
                                    {Array.from({ length: 4 }, (_, index) => {
                                        return <SkeletonCard key={index} />

                                    })}
                                </div>
                            ) : productStatsError || (productStatsIsFetching && !productStatsData) ? (
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
                                </div>) : (
                                <div className="grid gap-4 grid-cols-2">
                                    {productStatsData?.productStats.map((item: CustomerStats, key: number) => {
                                        return <StatsCard item={item} key={key} />
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>


            <TodayActivityLayout
                head="Product Variants"
                btn="not"
                detail="All variants of this product"
                icon={IoShirtOutline}
                children={(
                    <div className="w-full overflow-y-auto">
                        <table className="min-w-120 table-auto w-full">
                            <thead>
                                <tr className="text-left bg-orange-dark text-white uppercase text-sm">
                                    <th className="md:p-4 p-2 whitespace-nowrap rounded-l-lg font-bold">#</th>
                                    <th className="md:p-4 p-2 whitespace-nowrap font-bold">size</th>
                                    <th className="md:p-4 p-2 whitespace-nowrap font-bold">color</th>
                                    <th className="md:p-4 p-2 whitespace-nowrap font-bold">stock</th>
                                    <th className="md:p-4 p-2 whitespace-nowrap rounded-r-lg font-bold">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isPending ? (
                                    Array.from({ length: 2 }, (_, index) => {
                                        return <tr key={index} className="py-4 animate-pulse">
                                            <td className="py-4" colSpan={5}>
                                                <div className="bg-gray-200 rounded-md h-4 w-full" />
                                            </td>
                                        </tr>
                                    })
                                ) : error ? (
                                    <tr className="text-center">
                                        <td colSpan={5} className="py-10 text-center">
                                            <span className="grid gap-2 w-full text-center text-xs">
                                                <span>Unable to load today's stats</span>
                                                <span>Something went wrong while fetching data!!</span>
                                                <button onClick={getProductData} disabled={isPending} className={
                                                    `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                                }>
                                                    {isPending ? 'Refetching...' : 'Try again'}
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                ) : product && product?.variants?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5}>
                                            <span className="grid gap-2 py-10">
                                                <p className="text-center">No customer! Please add</p>
                                                <Button children={'+ Add Customer'} onClick={() => navigate('add-customer')}
                                                    className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                                            </span>
                                        </td>
                                    </tr>
                                ) :
                                    product?.variants.map((item, key: number) => {
                                        return <tr key={key} className="border-b border-border text-xs">
                                            <td className="md:p-4 p-2 py-4">{key + 1}</td>
                                            <td className="md:p-4 p-2 py-4">{item.size}</td>
                                            <td className="md:p-4 p-2 py-4">{item.color}</td>
                                            <td className="md:p-4 p-2 py-4">{item.stock}</td>
                                            <td className="md:p-4 p-2 py-4">
                                                <span className={`${item.stock === 0 ? 'bg-red-500' : 'bg-success'} w-fit border border-success-subtle text-white text-xs font-medium rounded grid place-items-center p-1`}>
                                                    {item.stock === 0 ? 'outOfStock' : 'inStock'}
                                                </span>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>
                )}
            />


            {/* Quick Actions  */}
            <CustomerPagesFooter btn1Color="bg-red-700 text-white" btn1Text="Delete Product" btn2Text="Edit Product"
                btn1ClickFun={() => {
                    if (!product) return
                    setModal({
                        type: 'delete-product',
                        data: {
                            header: 'Remove Product',
                            subHeading: <p>Do you want to remove {product.productName} product</p>,
                            actionBtn: () => handleDeactivateProduct(product._id),
                            actionBtnText: 'Delete'
                        }
                    })
                }
                } btn2ClickFun={handleEditProduct} />

        </div >
    )
}

export default ProductDetails