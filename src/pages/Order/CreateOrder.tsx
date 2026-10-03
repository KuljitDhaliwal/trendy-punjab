import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import Button from "../../components/ui/Button"
import { useNavigate, useParams } from "react-router-dom"
import { nameInitials } from "../../utils/NameInitials"
import React, { useContext, useEffect, useState } from "react"
import type { Customer } from "../Admin/Customers"
import { toast } from "react-toastify"
import { useGetCustomer, useGetSearchSingleProduct } from "../../features/admin/api/admin.mutations"
import { MdLocalPhone, MdOutlineHandshake } from "react-icons/md"
import { BsCashStack, BsEnvelope } from "react-icons/bs"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { IoShirtOutline } from "react-icons/io5"
import type { ProductType } from "../../types/Product"
import { FaRegTrashAlt } from "react-icons/fa"
import { ToggleCartContext } from "../../context/ToggleCartContext"


type OrderItemType = {
  productId?: string,
  productName?: string,
  category?: string,
  size?: string,
  color?: string,
  quantity?: number,
  price?: number,
  total?: number,
}

type OrderType = {
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


// type OrderColorType = {
//   productIndex: number,
//   incolor: string
// }


function CreateOrder() {
  const navigate = useNavigate()
  const { customerID } = useParams()
  const [product, setProduct] = useState<ProductType[]>([])
  const [order, setOrder] = useState<OrderType>({
    orderNumber: '',
    customerId: '',
    items: [],
    subtotal: 0,
    discount: 0,
    totalAmount: 0,
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    notes: ''
  })
  const [selectedProduct, setSelectedProduct] = useState<ProductType[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [color, setColor] = useState<Record<number | string, string>>({})
  const [sizeBtn, setSizeBtn] = useState<Record<number, string>>({})
  const [totalAmount, setTotalAmount] = useState<number | null>(null)
  const [subTotal, setSubTotal] = useState<number | null>(null)
  const [discount, setDiscount] = useState<number | null>(null)
  const [uniqueQuantity, setUniqueQuantity] = useState<Record<number, number>>({ 0: 1 })
  const { mutate: getCustomer } = useGetCustomer()
  const { mutate: getSearchSingleProduct, isPending, error } = useGetSearchSingleProduct()
  const { toggleCart } = useContext(ToggleCartContext)

  useEffect(() => {
    if (customerID) {
      getCustomer(customerID, {
        onSuccess: (data) => {
          console.log('Data', data)
          setCustomer(data.customer)
        },
        onError: (error) => {
          toast(error.message)
        }
      })
    }
  }, [customerID, getCustomer])


  //Handle Search Product
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (!query.trim()) {
      setProduct([])
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
    setSelectedProduct(prev => ([...prev, product]))
    setProduct([])
  }


  //Handle Item
  const handleItem = (product: ProductType, productIndex: number) => {
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

    setColor(prev => ({...prev, [productIndex]: ''}))
    setSizeBtn(prev => ({...prev, [productIndex]: ''}))
    setUniqueQuantity(prev=> ({...prev, [productIndex]: 1}))
  }


  //Handle Subtotal
  useEffect(()=>{
    const price = order.items.map(item=> {
      return item.total
    })

    const total = price.reduce((acc, curr)=>{
      return ((acc || 0) + (curr || 0))
    },0)

    setSubTotal(total || null)
    discount !== null ? setTotalAmount(total || null) : 0
  },[order, discount])


  //Handle Discount
  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(Number(e.target.value))
  }



  // //SetColor
  const handleColor = (productIndex: number, mycolor: string) => {
    setColor(prev => ({ ...prev, [productIndex]: mycolor }))
  }


  // //Handle Unique size btn
  // //SetBtn
  const handleSizeBtn = (productIndex: number, variantSize: string) => {
    setColor(prev => ({ ...prev, [productIndex]: '' }))
    setSizeBtn(prev => ({ ...prev, [productIndex]: variantSize }))
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


  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={'Orders / Create Order'}
        main={'Create Order'} third={'Search & add products to create a new order for your customer.'}
        right={(
          <Button children={
            <p className="flex items-center gap-1">
              <IoIosArrowBack /> Back to Customers
            </p>
          } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
        )} />



      <section className="grid md:grid-cols-[2fr_1fr] grid-cols-1 justify-between gap-2  items-start">
        <div className="grid gap-4">
          <div className="flex gap-2 bg-orange-light/50 rounded-lg w-full p-4">
            <div className="flex gap-2">
              <div className="rounded-full p-2 bg-orange-dark text-white h-fit shadow">
                <p className="text-xl">{nameInitials(customer?.fullname ?? '')}</p>
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
          <TodayActivityLayout
            head="Select Size"
            btn="not"
            detail="Search by productID or product name"
            icon={IoShirtOutline}
            children={(
              <div className="grid gap-4 relative">
                <div className="relative">
                  <input type="search" name="search-product" onChange={(e) => handleSearchProduct(e)}
                    className="w-full py-2 px-4 border-border border rounded-lg bg-white" placeholder="Search product..." />
                  <div className={`
                    min-h-30 w-full top-[calc(100%+8px)] shadow rounded-lg 
                    bg-white absolute p-4 ${product.length === 0 ? 'hidden' : 'grid'
                    } place-items-center`}>
                    {isPending ? (
                      <p className="animate-pulse">Searching...</p>
                    ) : error ? (
                      <p>Something went wrong!</p>
                    ) : (
                      <div className="grid gap-2 w-full">
                        {
                          product?.map((pro: ProductType) => {
                            return <button onClick={() => handleSelectProduct(pro)}
                              className="bg-orange-light cursor-pointer p-4 w-full">
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
                    <div className="h-30 w-full grid place-items-center">
                      <p>Please search products to add!!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {selectedProduct.map((product, productIndex) => {
                        return <div className="grid gap-4 bg-white p-4 rounded-md">
                          <div className="grid gap-1">
                            <p className="text-sm text-secondary-text">{product.productCode}</p>
                            <p className="">{product.productName}</p>
                            <p className="text-sm text-secondary-text">{product.brand}</p>
                            <p className="text-sm text-secondary-text">Category {product.category}</p>
                            <p className="text-orange-dark font-bold text-lg">₹{product.price}</p>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 justify-between items-start">

                            <div className="gap-2 grid self-start">
                              <p className="font-bold">Size</p>
                              <div className="flex gap-2 items-start">
                                {product && (
                                  [...new Set(product.variants.map(variant => variant.size))].map(size => {
                                    return <button onClick={() => handleSizeBtn(productIndex, String(size))}
                                      className={`p-2 border-2 self-start disabled:bg-border disabled:cursor-not-allowed
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
                                  [...new Set(product.variants.map(variant => variant.color))].map(inColor => {
                                    return <div key={inColor} className="relative w-6 h-6 rounded-full cursor-pointer">
                                      <input type="radio" name="color" disabled={!product.variants.some(
                                        variant => variant.size === sizeBtn[productIndex] && variant.color === inColor
                                      )}
                                        data-product={JSON.stringify(selectedProduct)}
                                        className="absolute inset-0 cursor-pointer disabled:cursor-not-allowed"
                                        value={inColor} onClick={() => handleColor(productIndex, (String(inColor)))} />
                                      <button disabled={!product.variants.some(
                                        variant => variant.size === sizeBtn[productIndex] && variant.color === inColor
                                      )} className={`${color[productIndex] === inColor ? 'border-blue-700' : 'border-transparent'} 
                                    border-4 absolute top-0 left-0 h-6 w-6 pointer-events-none
                                  cursor-pointer rounded-full`} style={{
                                          backgroundColor: inColor
                                        }}></button>
                                    </div>
                                  })
                                )}
                              </div>
                            </div>
                            {
                              sizeBtn[productIndex] && color[productIndex] && (

                                <div className="gap-2 grid">
                                  <p className="font-bold">Quantity</p>
                                  <div className="flex gap-4">
                                    <div className="flex border border-border rounded-md">
                                      <button disabled={uniqueQuantity[productIndex] <= 1}
                                        value={uniqueQuantity[productIndex]} name="decrement"
                                        onClick={(e) => handleQunatity(productIndex, e)}
                                        className="p-2 w-10 disabled:bg-border/30 disabled:cursor-not-allowed 
                                        bg-border cursor-pointer active:scale-95 rounded-l-md">
                                        -
                                      </button>
                                      <span className="p-2 w-10 grid place-items-center">{uniqueQuantity[productIndex]}</span>
                                      <button disabled={uniqueQuantity[productIndex] >= (product.variants.find(variant => variant.size === sizeBtn[productIndex] &&
                                        variant.color === color[productIndex])?.stock ?? 0)} value={uniqueQuantity[productIndex]} name="increment" onClick={(e) => handleQunatity(productIndex, e)}
                                        className="p-2 w-10 bg-border disabled:cursor-not-allowed disabled:bg-border/30 cursor-pointer active:scale-95 rounded-r-md">
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                          <Button children={'Add to Cart'} onClick={() => handleItem(product, productIndex)}
                            className="bg-orange-dark px-4 py-3 w-fit ml-auto text-white mt-4" />
                        </div>
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>

        <div className={` ${toggleCart ? 'absolute w-full h-full inset-0 mt-10' : 'md:flex flex-col hidden'}
          min-w-120 text-sm items-start h-[calc(100vh-145px)]
          w-full bg-orange-light rounded-lg`}>
          <div className="flex justify-between p-4 w-full items-center sticky top-0">
            <p className="font-bold">Order Items {order.items.length > 0 && (`(${order.items.length})`)}</p>
            <div className="flex gap-1 items-center text-xs underline 
                  text-orange-dark cursor-pointer">
              <FaRegTrashAlt /> Clear All
            </div>
          </div>
          <hr className="border-border" />
          <div className="flex-1 min-h-0 overflow-y-auto w-full scroll-smooth p-4">
            {order && order.items.length > 0 ? (
              <div className="grid gap-4">
                {order && order.items.map((product, index) => {
                  return <div className="grid gap-4 w-full bg-white p-4 rounded-md">
                    <div className="grid text-sm gap-2">
                      <div className="flex justify-between items-center">
                        <p>Product {index + 1}</p>
                        <button className="cursor-pointer">
                          <FaRegTrashAlt />
                        </button>
                      </div>
                      <hr className="border border-border"/>
                      <p>{product.productName}</p>
                      <p className="text-secondary-text">{product.category}</p>
                      <div className="flex text-xs text-secondary-text">
                        <p>Size: {product.size}</p>
                        <p>Color: {product.color}</p>
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
                    <input type="text" onChange={handleDiscount} className="border-border border p-2 rounded-lg bg-white" />
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
                  <div className="flex gap-4 justify-between">
                    <div className="grid gap-2 w-full">
                      <p>Payment Method</p>
                      <select name="payment" className="border-border rounded-lg bg-white border p-2 w-full">
                        <option disabled selected>Select Payment Method</option>
                        <option value="">Cash</option>
                        <option value="">UPI</option>
                      </select>
                    </div>
                    <div className="grid gap-2 w-full">
                      <p>Payment Status</p>
                      <select name="payment-status" className="border-border rounded-lg bg-white border p-2 w-full">
                        <option selected disabled>Pending</option>
                        <option value="">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <p>Order Notes (optional)</p>
                    <textarea name="order-notes" className="w-full h-20 border border-border rounded-lg"></textarea>
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
            <Button children={'Create Order'} className="bg-orange-dark w-full sticky bottom-0 px-4 py-3 text-white" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateOrder