import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import Button from "../../components/ui/Button"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import { nameInitials } from "../../utils/NameInitials"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useCreateOrder, useGetSearchSingleProduct } from "../../features/admin/api/admin.mutations"
import { MdLocalPhone, MdOutlineHandshake } from "react-icons/md"
import { BsCashStack, BsEnvelope } from "react-icons/bs"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { IoShirtOutline } from "react-icons/io5"
import type { ProductType } from "../../types/Product"
import { FaRegTrashAlt } from "react-icons/fa"
import { useToggleCart } from "../../context/ToggleCartContext"
import { useQueryClient } from "@tanstack/react-query"
import { useGetCustomer } from "../../features/admin/api/admin.queries"
import { COLOR_OPTIONS } from "../../static/ColorPallete"
import useModalContext from "../../context/ModalContext"

export type OrderItemType = {
  productId?: string,
  productName?: string,
  category?: string,
  size?: string,
  color?: string,
  quantity?: number,
  price?: number,
  total?: number,
}

type PaymentType = {
  payment: "Cash" | "UPI";
  status: "Pending" | "Paid" | "Partially Paid" | "Refunded";
};

export type OrderType = {
  orderNumber?: string,
  customerId?: string,
  items: OrderItemType[],
  subtotal?: number,
  discount?: number,
  totalAmount?: number,
  paymentMethod?: "Cash" | "UPI",
  paymentStatus?: "Pending" | "Paid" | "Partially Paid" | "Refunded",
  orderStatus?: "Pending" | "Completed" | "Cancelled" | "Returned",
  notes?: string
}





function CreateOrder() {
  const navigate = useNavigate()
  const { customerID } = useParams()
  const [product, setProduct] = useState<ProductType[]>([])
  const [searchProductValue, setSearchProductValue] = useState<string>('')
  const [order, setOrder] = useState<OrderType>({
    customerId: '',
    items: [],
    subtotal: 0,
    discount: 0,
    totalAmount: 0,
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    notes: ''
  })
  const [selectedProduct, setSelectedProduct] = useState<ProductType[]>([])
  const [color, setColor] = useState<Record<number | string, string | undefined>>({})
  const [sizeBtn, setSizeBtn] = useState<Record<number, string>>({})
  const [totalAmount, setTotalAmount] = useState<number | null>(null)
  const [errorValidation, setErrorValidation] = useState<Record<number, string | undefined>>({})
  const [subTotal, setSubTotal] = useState<number | null>(null)
  const [discount, setDiscount] = useState<number | null>(null)
  const [discountPrice, setDiscountPrice] = useState<number | null>(null)
  const [orderDisable, setOrderDisabled] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')
  const [payment, setPayment] = useState<PaymentType>({
    payment: "Cash",
    status: "Pending"
  });
  const [uniqueQuantity, setUniqueQuantity] = useState<Record<number, number>>({})
  const {
    data,
    isLoading,
    isError,
    isFetched,
    isFetching,
    refetch
  } = useGetCustomer(String(customerID))
  const customer = data?.customer
  const { mutate: getSearchSingleProduct, isPending, error } = useGetSearchSingleProduct()
  const { toggleCart, setToggleCart, setCartValue } = useToggleCart()
  const { mutate: getCreateOrder } = useCreateOrder()
  const queryClient = useQueryClient()
  const {setModal} = useModalContext()
  const hasBlocked = order.items.length > 0
  const blocked = useBlocker(hasBlocked)



  useEffect(()=>{
    if(blocked.state === "blocked"){
      setModal({
        type: 'order-pending',
        data: {
          header: 'Pending Order',
          subHeading: <div className="grid gap-2">
            You have items in your order that haven't been submitted.
            <p className="text-xl">Leave this page?</p>
            <p className="text-xs max-w-80 m-auto">You have an unfinished order for this customer. If you leave now, your selected items and order details will be lost.</p>
            </div>,
          actionBtnText: 'Leave Page',
          actionBtn: ()=> {
            setModal(null),
            blocked.proceed()
          },
        }
      })
    }
  },[blocked])






  //Handle Toggle button false on window resize
  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setToggleCart(false)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [])




  //Handle Search Product
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchProductValue(query)
    if (!query.trim()) {
      setSearchProductValue('')
      return
    }
    getSearchSingleProduct(query, {
      onSuccess: (data) => {
        setProduct(data.product)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  //Handle Select Product
  const handleSelectProduct = (product: ProductType) => {
    setUniqueQuantity(prev => ({ ...prev, [selectedProduct.length]: 1 }))

    setSelectedProduct(prev => {
      const exist = prev.some(pro => pro._id === product._id)
      if (exist) {
        return prev
      }
      return [...prev, product]
    })
    setSearchProductValue("")
    setProduct([])
  }


  //Handle Item
  const handleItem = (product: ProductType, productIndex: number) => {
    //Validate Size and Color
    if (sizeBtn[productIndex] === undefined || color[productIndex] === undefined) {
      setErrorValidation(prev => ({ ...prev, [productIndex]: `Please select color and size` }))
      return
    }


    setOrder(prev => ({
      ...prev,
      'items': [...prev.items, {
        productId: product._id,
        productName: product.productName,
        category: product.category,
        size: sizeBtn[productIndex],
        color: color[productIndex],
        quantity: uniqueQuantity[productIndex],
        price: product.price,
        total: uniqueQuantity[productIndex] * product.price
      }],
    }))

    setColor(prev => ({ ...prev, [productIndex]: '' }))
    setSizeBtn(prev => ({ ...prev, [productIndex]: '' }))
    setUniqueQuantity(prev => ({ ...prev, [productIndex]: 1 }))
  }


  //Handle Subtotal
  useEffect(() => {
    const price = order.items.map(item => {
      return item.total
    })

    const total = price.reduce((acc, curr) => {
      return ((acc || 0) + (curr || 0))
    }, 0)

    setSubTotal(total || 0)
    const discountAmount = ((total || 0) * ((discount || 0) / 100))
    setDiscountPrice(discountAmount)
    const val = discount === null ? (total || 0) : ((total || 0) - discountAmount)
    setTotalAmount(Number(val))
  }, [order, discount])


  //Handle Delete Item from cart
  const handleRemoveItem = (item: OrderItemType) => {
    setOrder(prev => ({
      ...prev,
      'items': prev.items.filter(el => el.productId !== item.productId)
    }))
  }

  //handle Clear Cart
  const handleClearCart = () => {
    setOrder(prev => ({
      ...prev,
      'items': []
    }))
  }

  //Handle Discount
  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(Number(e.target.value))
  }



  // //SetColor
  const handleColor = (productIndex: number, mycolor: string) => {
    setColor(prev => ({ ...prev, [productIndex]: mycolor }))

    if (sizeBtn[productIndex] === undefined) return
    //Reset Validator
    setErrorValidation(prev => ({
      ...prev,
      [productIndex]: undefined
    }))
  }


  // //Handle Unique size btn
  // //SetBtn
  const handleSizeBtn = (productIndex: number, variantSize: string) => {
    setColor(prev => ({ ...prev, [productIndex]: undefined }))
    setSizeBtn(prev => ({ ...prev, [productIndex]: variantSize }))
    if (color[productIndex] === undefined) return
    //Reset Validator
    setErrorValidation(prev => ({
      ...prev,
      [productIndex]: undefined
    }))
  }






  //Handle Quantity
  const handleQunatity = (productIndex: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget
    if (name === 'increment') {
      setUniqueQuantity(prev => ({ ...prev, [productIndex]: Number(value) + 1 }))
    } else {
      setUniqueQuantity(prev => ({ ...prev, [productIndex]: Number(value) - 1 }))
    }
  }



  //Handle Payment method and status
  const handlePayment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setPayment(prev => ({ ...prev, [name]: value }))
  }



  //Handle Create Order Validation
  const handleCreateOrderValidation = () => {
    if (order.items.length === 0
      || !customerID
      || subTotal === null
      || totalAmount === null
      || Object.entries(payment).length < 2
      || payment.status === 'Pending'
    ) {
      setOrderDisabled(true)
      return
    }
    setOrderDisabled(false)
  }

  useEffect(() => {
    handleCreateOrderValidation()
  }, [order, customerID, subTotal, totalAmount, payment])

  //handle Create Order
  const handleCreateOrder = () => {
    setOrder((prev: OrderType) => ({
      ...prev,
      subtotal: subTotal ?? 0,
      totalAmount: totalAmount ?? 0,
      paymentMethod: payment?.payment,
      paymentStatus: payment?.status,
      customerId: customerID,
      notes: orderNotes
    }))

    


    const data: OrderType = {
      customerId: customerID,
      items: order.items,
      subtotal: subTotal ?? 0,
      discount: discountPrice ?? 0,
      totalAmount: totalAmount ?? 0,
      paymentMethod: payment.payment,
      paymentStatus: payment.status,
      notes: orderNotes
    }

    if (!customerID) {
      toast.error("Please select a customer");
      return;
    }

    if (Object.entries(data).length === 0) {
      toast.error("Data is missing");
      return;
    }

    getCreateOrder({ customerID, data }, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['getCustomers']
        })
        queryClient.invalidateQueries({
          queryKey: ["getOrders"],
        });
        queryClient.invalidateQueries({
          queryKey: ['getCustomer', customerID],
        });
        order.items.forEach(item => {
          queryClient.invalidateQueries({
            queryKey: ['getProduct', item.productId],
          });
        })
        queryClient.invalidateQueries({
          queryKey: ['products'],
        });
        toast.success('Order Created!!')
        setOrder(
          {
            customerId: '',
            items: [],
            subtotal: 0,
            discount: 0,
            totalAmount: 0,
            paymentMethod: 'Cash',
            paymentStatus: 'Pending',
            notes: ''
          }
        )
        navigate(`/dashboard/orders/order/${data.order._id}`)
      },
      onError: () => {
        toast.error('Order Create Error!!')
      }
    })
  }


  useEffect(()=>{
    if(!order?.items)return
    setCartValue(order?.items.length)
  }, [order?.items])




  return (
    <div className="flex flex-col min-h-[calc(100vh-48px)] gap-6">
      <AdminPagesHeader first={'Orders / Create Order'}
        main={'Create Order'} third={'Search & add products to create a new order for your customer.'}
        right={(
          <Button children={
            <p className="flex items-center gap-1">
              <IoIosArrowBack /> Back to Customers
            </p>
          } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
        )} />


      <section className="grid flex-1 items-stretch md:grid-cols-[2fr_1fr] grid-cols-1 justify-between gap-2 ">
        <div className="flex flex-col flex-1 gap-4">
          {isLoading && !isFetched ? (
            <div className="flex glass-card p-4 md:flex-row flex-col gap-4 justify-between w-full items-start">
              <div className="flex gap-2">
                <div className="rounded-full p-2 w-10 h-10 bg-gray-200 shadow animate-pulse">
                </div>
                <div className="grid gap-2">
                  <div className="bg-gray-200 h-4 rounded-md w-30 shadow"></div>
                  <div className="grid gap-2">
                    <div className="flex gap-1 items-center">
                      <MdLocalPhone />
                      <div className="bg-gray-200 h-3 rounded-md w-25 shadow"></div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <BsEnvelope />
                      <div className="bg-gray-200 h-3 rounded-md w-40 shadow"></div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <MdOutlineHandshake />
                      <div className="bg-gray-200 h-3 rounded-md w-40 shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isError || (isFetching && !data) ? (
            <div className="grid glass-card p-4 place-items-center h-25 w-full">
              <span className="grid gap-2 w-full text-center text-xs">
                <span>Unable to load today's stats</span>
                <span>Something went wrong while fetching data!!</span>
                <button onClick={() => refetch()} disabled={isLoading} className={
                  `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                }>
                  {isLoading ? 'Refetching...' : 'Try again'}
                </button>
              </span>
            </div>
          ) : (
            <div className="grid glass-card p-4 gap-4">
              <div className="flex gap-2 bg-orange-light/50 rounded-lg w-full">
                <div className="flex gap-2">
                  <div className="rounded-full w-10 h-10 grid place-items-center bg-orange-dark text-white shadow">
                    <p className="text-xl">{nameInitials(customer?.fullname)}</p>
                  </div>
                  <div className="grid gap-2">
                    <p>{customer?.fullname}</p>
                    <div className="grid gap-2">
                      <div className="flex gap-1 items-center">
                        <MdLocalPhone />
                        <p className="text-[12px] text-secondary-text">
                          {customer?.phone}
                        </p>
                      </div>
                      {customer && customer.email && (
                        <div className="flex gap-1 items-center">
                          <BsEnvelope />
                          <p className="text-[12px] text-secondary-text">
                            {customer?.email}
                          </p>
                        </div>
                      )}
                      {customer && (
                        <div className="flex gap-1 items-center">
                          <MdOutlineHandshake />
                          <p className="text-[12px] text-secondary-text">
                            customer since {new Date(customer.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <TodayActivityLayout
            head="Select Size"
            btn="not"
            detail="Search by productID or product name"
            icon={IoShirtOutline}
            children={(
              <div className="grid items-start gap-4 relative">
                <div className="relative">
                  <input id="searchProduct" autoComplete="off" type="search" name="search-product" onChange={(e) => handleSearchProduct(e)}
                    className="w-full py-2 px-4 border-border border rounded-lg bg-white" placeholder="Search product..." />
                  <div className={`
                    max-h-80 z-1000 w-full top-12 shadow rounded-lg 
                    bg-white overflow-y-auto absolute p-4 ${searchProductValue === '' ? 'hidden' : 'grid'
                    }`}>
                    {isPending ? (
                      <p className="animate-pulse text-center py-10">Searching...</p>
                    ) : error ? (
                      <p>Something went wrong!</p>
                    ) : product.length <= 0 ? (
                      <p className="text-center py-10">No Product found!!</p>
                    ) : (
                      <div className="grid items-start gap-2 w-full">
                        {
                          product?.map((pro: ProductType) => {
                            return <button key={pro._id} onClick={() => handleSelectProduct(pro)}
                              className="glass-card cursor-pointer p-4 w-full">
                              <span className="flex justify-between items-center">
                                <span className="grid gap-1 text-left justify-start">
                                  <span className="text-xs text-secondary-text">{pro.productCode}</span>
                                  <span>{pro.productName}</span>
                                  <span className="text-orange-dark font-bold text-lg">₹{pro.price}</span>
                                  <span className="text-xs flex gap-2">
                                    <span className="text-success">
                                      Stocks {pro.variants.find(variant => variant.stock)?.stock}
                                    </span>
                                    <span className="text-secondary-text">
                                      Variants {pro.variants.length}
                                    </span>
                                  </span>
                                </span>
                                <span><IoIosArrowForward /></span>
                              </span>
                            </button>
                          })
                        }
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {selectedProduct.length === 0 ? (
                    <div className="h-30 w-full grid place-items-center self-center">
                      <p>Please search products to add!!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {selectedProduct.map((product, productIndex) => {
                        return <div key={product._id} className="grid gap-2 bg-white shadow p-4 rounded-md">
                          <div className="grid grid-cols-2 gap-6">

                            <div className="grid gap-1 w-full">
                              <p className="text-sm bg-gray-100 w-fit p-1 rounded-md shadow text-secondary-text">{product.productCode}</p>
                              <p className="">{product.productName}</p>
                              <p className="text-sm text-secondary-text">{product.brand}</p>
                              <p className="text-sm text-secondary-text">Category {product.category}</p>
                              <p className="text-orange-dark font-bold text-lg">₹{product.price}</p>
                            </div>

                            <div className="grid w-full grid-cols-2 gap-4 justify-between items-start">
                              <div className="gap-2 grid self-start">
                                <p className="font-bold">Size</p>
                                <div className="grid grid-cols-2 gap-2 items-start">
                                  {product && (
                                    [...new Set(product.variants.map(variant => variant.size))].map((size, key) => {
                                      return <button key={key} onClick={() => handleSizeBtn(productIndex, String(size))}
                                        disabled={Number(product.variants.find(variant => variant.size === size)?.stock) <= 0}
                                        className={`w-6 h-6 grid place-items-center text-xs md:w-10 border-2 self-start disabled:bg-border disabled:active:scale-100 disabled:cursor-not-allowed
                                        ${sizeBtn[productIndex] === String(size) ? 'border-blue-700' :
                                            'border-transparent'} cursor-pointer rounded-md shadow active:scale-95`}>
                                        {size}
                                      </button>
                                    })
                                  )}
                                </div>
                              </div>

                              <div className="gap-2 grid self-start">
                                <p className="font-bold">Color</p>
                                <div className="flex gap-2 items-start">
                                  {product && (
                                    [...new Set(product.variants.map(variant => variant.color))].map((inColor, key) => {
                                      return <div key={inColor} className="relative w-6 h-6 rounded-full cursor-pointer">
                                        <input id={String(key)} type="radio" name="color" disabled={!product.variants.some(
                                          variant => variant.size === sizeBtn[productIndex] && variant.color === inColor
                                        )}
                                          data-product={JSON.stringify(selectedProduct)}
                                          className="absolute inset-0 cursor-pointer disabled:cursor-not-allowed"
                                          value={inColor} onClick={() => handleColor(productIndex, (String(inColor)))} />
                                        <button disabled={!product.variants.some(
                                          variant => variant.size === sizeBtn[productIndex] && variant.color === inColor
                                        )} className={`${color[productIndex] === inColor ? 'border-[#D9D9D9]' : 'border-transparent'} 
                                      border-6 absolute top-0 left-0 h-6 w-6 pointer-events-none
                                    cursor-pointer rounded-full`} style={{
                                            backgroundColor: inColor
                                          }}></button>
                                      </div>
                                    })
                                  )}
                                </div>
                              </div>

                              <div className="gap-2 grid lg:max-w-full max-w-40 col-span-2 w-full">
                                <p className="font-bold">Quantity</p>
                                <div className="flex gap-4 w-full">
                                  <div className="flex border w-full border-border rounded-md">
                                    <button disabled={(uniqueQuantity[productIndex]) <= 1}
                                      value={uniqueQuantity[productIndex]} name="decrement"
                                      onClick={(e) => handleQunatity(productIndex, e)}
                                      className="p-1 w-full disabled:bg-border/30 disabled:cursor-not-allowed 
                                          bg-border cursor-pointer active:scale-95 rounded-l-md">
                                      -
                                    </button>
                                    <span className="p-1 w-full grid place-items-center">{uniqueQuantity[productIndex]}</span>
                                    <button disabled={uniqueQuantity[productIndex] >= (product.variants.find(variant => variant.size === sizeBtn[productIndex] &&
                                      variant.color === color[productIndex])?.stock ?? 0)} value={uniqueQuantity[productIndex]} name="increment" onClick={(e) => handleQunatity(productIndex, e)}
                                      className="p-1 w-full bg-border disabled:cursor-not-allowed disabled:bg-border/30 cursor-pointer active:scale-95 rounded-r-md">
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className="relative mt-4">
                            {errorValidation[productIndex] && (
                              <p className="text-red-500 absolute -top-6">{errorValidation[productIndex]}</p>
                            )}

                            <Button children={'Add to Cart'}
                              disabled={product.variants.every(pro => pro.stock === 0)}
                              onClick={() => handleItem(product, productIndex)}
                              className="bg-orange-dark 
                              float-end 
                              px-4 py-3 w-fit ml-auto text-white" />
                          </div>
                        </div>
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div className={`
          ${toggleCart
            ? "fixed inset-0 flex bg-white  h-[calc(100vh-56px)] backdrop-blur-2xl p-4 z-5 w-full mt-14 overflow-y-auto"
            : "hidden md:flex sticky top-6 rounded-2xl shadow bg-white min-h-130 h-[calc(100vh-150px)]"
          }
          flex-col
          items-start
          text-sm
          xl:min-w-100
          min-w-80
          `}>

          <div className="flex justify-between backdrop-blur-2xl p-4 w-full items-center sticky top-0">
            <p className="font-bold">Order Items {order.items.length > 0 && (`(${order.items.length})`)}</p>
            {
              order.items.length > 0 && (
                <button className="flex gap-1 items-center text-xs underline 
                  text-orange-dark cursor-pointer" onClick={handleClearCart}>
                  <FaRegTrashAlt /> Clear All
                </button>
              )
            }
          </div>
          <hr className="border-border" />
          <div className="flex-1 min-h-0 overflow-y-auto w-full scroll-smooth p-4">
            {order && order.items.length > 0 ? (
              <div className="grid gap-4">
                {order && order.items.map((product, index) => {
                  return <div key={product.productId} className="grid gap-4 w-full bg-white rounded-md">
                    <div className="grid text-sm gap-2">
                      <div className="flex justify-between items-center">
                        <p>Product {index + 1}</p>
                        <button className="cursor-pointer" onClick={() => handleRemoveItem(product)}>
                          <FaRegTrashAlt className="text-red-500"/>
                        </button>
                      </div>
                      <hr className="border border-border" />
                      <p>{product.productName}</p>
                      <p className="text-secondary-text">{product.category}</p>
                      <div className="flex text-xs text-secondary-text">
                        <p>Size: {product.size}</p>
                        <p>Color: {COLOR_OPTIONS.find(color => color.hex === product.color)?.name}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>₹{product.price} x {product.quantity}</p>
                        <p className="font-bold text-sm">₹{product.total}</p>
                      </div>
                    </div>
                  </div>
                })
                }
                <hr className="border-border" />
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-secondary-text">Subtotal</p>
                    <p className="font-bold">₹{subTotal}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-secondary-text">Discount</p>
                    <input id="discount" name="discount" type="text" onChange={handleDiscount} className="border-border border p-2 rounded-lg bg-white" />
                  </div>
                </div>

                <hr className="border-border" />
                <div className="flex justify-between items-center text-lg">
                  <p className="font-bold">Total Amount</p>
                  <p className="font-bold text-orange-dark">₹{totalAmount}</p>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <div className="rounded-full p-1 shadow bg-orange-dark h-fit">
                      <BsCashStack className="text-white" />
                    </div>
                    <p>Payment Details</p>
                  </div>
                  <div className="flex md:flex-row flex-col gap-4 justify-between">
                    <div className="grid gap-2 w-full">
                      <p>Payment Method</p>
                      <select name="payment" value={payment.payment} onChange={handlePayment} className="border-border rounded-lg bg-white border p-2 w-full">
                        <option value="" disabled>Select Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Upi">UPI</option>
                      </select>
                    </div>
                    <div className="grid gap-2 w-full">
                      <p>Payment Status</p>
                      <select name="status" value={payment.status} onChange={handlePayment} className="border-border rounded-lg bg-white border p-2 w-full">
                        <option value="" disabled>Select Payment Method</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <p>Order Notes (optional)</p>
                    <textarea name="order-notes"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full h-20 border border-border rounded-lg"></textarea>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid place-items-center flex-1 h-full">
                <p>Please add items!</p>
              </div>
            )}
          </div>
          <div className="p-4 w-full">
            <Button
              children={'Create Order'}
              disabled={orderDisable}
              onClick={handleCreateOrder}
              className="
            bg-orange-dark 
            w-full sticky 
            bottom-0 
            px-4 
            py-3 
            text-white" />
          </div>
        </div>
      </section >
    </div >
  )
}

export default CreateOrder