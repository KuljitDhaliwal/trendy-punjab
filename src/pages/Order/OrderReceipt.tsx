import { useNavigate, useParams } from "react-router-dom"
import { useGetOrder } from "../../features/admin/api/admin.queries"
import Trendy from '../../assets/images/logo.webp'
import Thanks from '../../assets/images/thankyou.png'
import { useGetCustomer } from "../../features/admin/api/admin.mutations"
import { useEffect, useState } from "react"
import type { Customer } from "../Admin/Customers"
import type { OrderItemType } from "./CreateOrder"
import Button from "../../components/ui/Button"
import { IoIosArrowRoundBack, IoIosMail, IoIosPrint, IoMdDownload } from "react-icons/io"
import { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"



function OrderReceipt() {
    const { orderID } = useParams()
    const { data, isLoading, error, isFetched, isFetching, refetch } = useGetOrder(String(orderID))
    const { mutate: getCustomer } = useGetCustomer()
    const [customer, setCustomer] = useState<Customer>()
    const receiptRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!data?.order?.customerId) return
        getCustomer(data?.order?.customerId, {
            onSuccess: (data) => {
                setCustomer(data.customer)
            },
            onError: () => {
                console.log('Customer find error!!')
            }
        })
    }, [data])


    //HandleDownload
    const handleDownload = async () => {
        if (!receiptRef.current) return

        const canvas = await html2canvas(receiptRef.current, {
            scale: 2,
            backgroundColor: "#ffffff",
        })

        const imageData = canvas.toDataURL("image/png")


        const pdfWidth = 190
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        const margin = 10

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [
                pdfWidth + margin * 2,
                pdfHeight + margin * 2,
            ],
        })

        pdf.addImage(
            imageData,
            "PNG",
            margin,
            margin,
            pdfWidth,
            pdfHeight
        )

        pdf.save(`${data?.order?.orderNumber}.pdf`)
    }



    //Handle Print
    const handlePrint = () => {
        window.print()
    }


    return (
        <div className="grid gap-6 p-4">
            {isLoading || data ? (
                <div ref={receiptRef} className={`grid gap-4 font-mono w-113 text-xs ticket p-4 bg-orange-100 mx-auto shadow-2xl`}>
                    <div className="grid gap-4 mb-4">
                        <img src={Trendy} alt="Website Logo" className="h-20 mx-auto" />
                        <address className="text-secondary-text text-center max-w-60 mx-auto text-xs">
                            <p>Sekhon Complex, Raikot Road, opp. Gurdwara Hargobind Sahib, Mullanpur Dakha, Punjab 141101</p>
                        </address>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex justify-between items-start">
                            <p className="font-normal">Invoice No:</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-30 shadow" />
                            ) : (
                                <p>{data?.order?.orderNumber}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-start">
                            <p className="font-normal">Date:</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                            ) : (
                                <p>{new Date(data?.order?.createdAt).toLocaleDateString()}</p>
                            )}

                        </div>
                        <div className="flex justify-between items-start">
                            <p className="font-normal">Customer:</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-30 shadow" />
                            ) : (
                                <p>{customer?.fullname}</p>
                            )}

                        </div>
                    </div>
                    <hr className="border border-dotted" />
                    <div className="overflow-x-auto w-full">
                        <table className="text-xs w-full min-w-80 ">
                            <thead className="text-left">
                                <tr className="bg-[#D9D9D6]">
                                    <th className="p-2 font-normal rounded-l-lg">#</th>
                                    <th className="p-2 font-normal">Product</th>
                                    <th className="p-2 font-normal">Size</th>
                                    <th className="p-2 font-normal">Color</th>
                                    <th className="p-2 font-normal">Qty</th>
                                    <th className="p-2 font-normal">Price</th>
                                    <th className="p-2 font-normal rounded-r-lg">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && !isFetched ? (
                                    Array.from({ length: 2 }, (_, index) => {
                                        return <tr key={index} className="py-2 animate-pulse">
                                            <td className="py-2" colSpan={8}>
                                                <div className="bg-gray-200 rounded-md h-4 w-full" />
                                            </td>
                                        </tr>
                                    })
                                ) : error || (isFetching && !data) ? (
                                    <tr className="w-full">
                                        <td colSpan={7} className="py-10">
                                            <span className="grid gap-2 w-full text-center text-xs">
                                                <span>Unable to load order</span>
                                                <span>Something went wrong while fetching data!!</span>
                                                <button onClick={() => refetch()} disabled={isFetching} className={
                                                    `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                                }>
                                                    {isFetching ? 'Refetching...' : 'Try again'}
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                ) : data && data?.order?.items?.map((item: OrderItemType, key: number) => {
                                    return <tr className="border-b border-border">
                                        <td className="p-2">{key + 1}</td>
                                        <td className="p-2">{item.productName}</td>
                                        <td className="p-2">{item.size}</td>
                                        <td className="p-2">{item.color}</td>
                                        <td className="p-2">{item.quantity}</td>
                                        <td className="p-2">₹{item.price}</td>
                                        <td className="p-2">₹{item.total}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex justify-between items-start text-xs">
                            <p className="font-normal">Subtotal</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-2 mt-0.5 rounded-md w-8 shadow" />
                            ) : (
                                <p>₹{data?.order?.subtotal}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-start text-xs">
                            <p className="font-normal">Discount</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-2 mt-0.5 rounded-md w-8 shadow" />
                            ) : (
                                <p>{data?.order?.discount === 0 ? '--' : data?.order?.discount}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between font-normal items-start bg-orange-dark text-white p-2 rounded-md">
                        <p>Total Amount</p>
                        {isLoading ? (
                            <div className="bg-gray-200 h-2 mt-0.5 rounded-md w-8 shadow" />
                        ) : (
                            <p>₹{data?.order?.totalAmount}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex justify-between items-start text-xs">
                            <p className="font-normal">Payment Method</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-2 mt-0.5 rounded-md w-8 shadow" />
                            ) : (
                                <p>{data?.order?.paymentMethod}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-start text-xs">
                            <p className="font-normal">Payment Status</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-2 mt-0.5 rounded-md w-8 shadow" />
                            ) : (
                                <p>{data?.order?.paymentStatus}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-start text-xs">
                            <p className="font-normal">Notes</p>
                            {isLoading ? (
                                <div className="bg-gray-200 h-2 mt-0.5 rounded-md w-8 shadow" />
                            ) : (
                                <p>{data?.order?.notes === "" ? 'Thank you for shopping with us!!' : data?.order?.notes}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid place-items-center">
                        <img src={Thanks} alt="Thank you" className="h-15 mx-auto" />
                        <p className="italic font-thin">Visit Again</p>
                    </div>
                </div>
            ) : (
                <div className="m-auto min-h-60 w-113 p-4 glass-card grid place-items-center">
                    <span className="grid gap-2 w-full text-center text-xs">
                        <span>Unable to load order's stats</span>
                        <span>Something went wrong while fetching data!!</span>
                        <button onClick={() => refetch()} disabled={isFetching} className={
                            `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                        }>
                            {isFetching ? 'Refetching...' : 'Try again'}
                        </button>
                    </span>
                </div>
            )}
            <div className="flex gap-4 justify-center print:hidden">
                <Button disabled={isFetching || isLoading || !data} onClick={handlePrint} children={<span className="flex items-center gap-1 disabled:bg-gray-200 disabled:cursor-not-allowed">
                    <IoIosPrint />
                    Print Receipt
                </span>} className="bg-orange-dark px-4 py-2 text-white" />
                <Button disabled={isFetching || isLoading || !data} children={<span className="flex items-center gap-1 disabled:bg-gray-200 disabled:cursor-not-allowed" onClick={handleDownload}>
                    <IoMdDownload />
                    Download Receipt
                </span>} className="px-4 py-2 bg-white" />
                <Button disabled={isFetching || isLoading || !data} children={<span className="flex items-center gap-1 disabled:bg-gray-200 disabled:cursor-not-allowed">
                    <IoIosMail />
                    Send Receipt
                </span>} className="px-4 py-2 bg-white" />
                <Button onClick={() => navigate('/dashboard/orders')} children={<span className="flex items-center gap-1 disabled:bg-gray-200 disabled:cursor-not-allowed">
                    <IoIosArrowRoundBack />
                    Back Orders
                </span>} className="px-4 py-2 bg-white" />
            </div>
        </div>

    )
}

export default OrderReceipt