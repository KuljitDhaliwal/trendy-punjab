import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io"
import Button from "../../../components/ui/Button"
import AdminPagesHeader from "../../../features/admin/components/AdminPagesHeader"
import { useNavigate, useParams } from "react-router-dom"
import CustomerPagesFooter from "../../../features/admin/components/CustomerPagesFooter"
import { useDeactivateProduct, useGetProduct } from "../../../features/admin/api/admin.mutations"
import { useEffect, useState } from "react"
import type { ProductType } from "../../../types/Product"
import { toast } from "react-toastify"
import TodayActivityLayout from "../../../features/admin/components/TodayActivityLayout"
import { IoShirtOutline } from "react-icons/io5"
import { useGetProductStats } from "../../../features/admin/api/admin.queries"
import type { CustomerStats } from "../Customers"
import StatsCard from "../../../features/admin/components/StatsCard"
import { useQueryClient } from "@tanstack/react-query"
import useModalContext from "../../../context/ModalContext"



function ProductDetails() {
    const navigate = useNavigate()
    const { productID } = useParams()
    const { mutate: getProduct, isPending, error } = useGetProduct()
    const { mutate: deactiveProduct, isPending: deactiveProductLoading } = useDeactivateProduct()
    const {setModal} = useModalContext()
    const {
        data: productStatsData,
        error: productStatsError,
        isLoading: productStatsLoading
    } = useGetProductStats(productID || '')
    const [product, setProduct] = useState<ProductType>()
    const queryClient = useQueryClient()

    //Get Product
    useEffect(() => {
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
    }, [productID])





    //Handle View Product
    const handleEditProduct = () => {
        navigate(`/dashboard/products/edit-product/${productID}`)
    }

    const handleCancel = () => {

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
                        <p className="flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back to Products
                        </p>
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
                        <div className="grid gap-4">
                            <div className="flex gap-4">
                                <p className="text-lg">{product?.productName}</p>
                                {product?.isActive && (
                                    <span className="bg-success border border-success-subtle text-white text-xs font-medium rounded grid place-items-center px-1">Active</span>
                                )}
                            </div>
                            <div className="grid gap-4 ">
                                <div className="flex gap-10 justify-between">
                                    <p className="text-secondary-text">Product Code</p>
                                    <p className="font-semibold">{product?.productCode}</p>
                                </div>
                                <hr className="text-border" />
                                <div className="flex gap-10 justify-between">
                                    <p className="text-secondary-text">Category</p>
                                    <p className="font-semibold">{product?.category}</p>
                                </div>
                                <hr className="text-border" />
                                <div className="flex gap-10 justify-between">
                                    <p className="text-secondary-text">Brand</p>
                                    <p className="font-semibold">{product?.brand}</p>
                                </div>
                                <hr className="text-border" />
                                <div className="flex gap-10 justify-between">
                                    <p className="text-secondary-text">Price</p>
                                    <p className="font-semibold">₹{product?.price}</p>
                                </div>

                            </div>
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
                            {productStatsLoading ? (
                                <div className="w-full h-50 glass-card animate-pulse grid place-items-center">
                                    <p>Loading...</p>
                                </div>) : productStatsError ? (
                                    <div className="w-full h-50 glass-card animate-pulse grid place-items-center">
                                        <p>Something went wrong!</p>
                                    </div>) : (
                                <div className="grid gap-4 md:grid-cols-2">
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
                                    <th className="p-4 rounded-l-lg font-bold">#</th>
                                    <th className="p-4 font-bold">size</th>
                                    <th className="p-4 font-bold">color</th>
                                    <th className="p-4 font-bold">stock</th>
                                    <th className="p-4 rounded-r-lg font-bold">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isPending ? (
                                    <tr className="text-center">
                                        <td colSpan={7} className="py-10 text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr className="text-center">
                                        <td colSpan={7} className="py-10 text-center">
                                            Something error
                                        </td>
                                    </tr>
                                ) : product && product?.variants?.length === 0 ? (
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
                                    product?.variants.map((item, key: number) => {
                                        return <tr key={key} className="border-b border-border text-xs">
                                            <td className="p-4">{key + 1}</td>
                                            <td className="p-4">{item.size}</td>
                                            <td className="p-4">{item.color}</td>
                                            <td className="p-4">{item.stock}</td>
                                            <td className="p-4">
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
            <CustomerPagesFooter btn1Color="bg-red-700 text-white" btn1Text="Delete Product" btn2Text="Edit Customer"
                btn1ClickFun={() => {
                    if(!product)return
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