import { IoIosArrowRoundBack } from "react-icons/io"
import Button from "../../../components/ui/Button"
import AdminPagesHeader from "../../../features/admin/components/AdminPagesHeader"
import { useNavigate, useParams } from "react-router-dom"
import TodayActivityLayout from "../../../features/admin/components/TodayActivityLayout"
import { FaRegUser } from "react-icons/fa"
import { addProductData, productVariantData, type AddProductType } from "../../../static/AddProductData"
import { Input } from "../../../components/ui/Input"
import { FaBorderNone } from "react-icons/fa6";
import { useEffect, useState } from "react"
import CustomerPagesFooter from "../../../features/admin/components/CustomerPagesFooter"
import { useCreateProduct, useEditProduct, useGetProduct } from "../../../features/admin/api/admin.mutations"
import { toast } from "react-toastify"
import type { ProductType, ProductVariantType } from "../../../types/Product"
import { FaRegTrashAlt } from "react-icons/fa";





export type FormValueType = {
  productName: string,
  category: string,
  brand: string,
  price: number,
  variants: ProductVariantType[]
}


type ErrorType = {
  productName: string
  category: string
  brand: string
  price: string
}





function EditProduct() {
  const [formValue, setFormValue] = useState<FormValueType>({
    productName: '',
    category: '',
    brand: '',
    price: 0,
    variants: [
      {
        size: '',
        stock: 0,
        color: ''
      }
    ]
  })
  const [variants, setVariants] = useState<AddProductType[][]>([])
  const [product, setProduct] = useState<ProductType>()
  const [error, setError] = useState<Partial<ErrorType>>({})
  const [stockError, setStockError] = useState<number[]>([])
  const { mutate: getProduct, isPending } = useGetProduct()
  const { mutate: editProduct } = useEditProduct()
  const navigate = useNavigate()
  const { productID } = useParams()


  // //Get Product
  useEffect(() => {
    if (productID) {
      getProduct(productID, {
        onSuccess: (data) => {
          setProduct(data.product)
          setFormValue(data.product)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  }, [productID])



  //AddVariant
  useEffect(() => {
    if (product) {
      let localObj: any[] = []
      Array.from({ length: formValue.variants.length }, () => {
        localObj.push(productVariantData)
      })
      setVariants(localObj)
    }
  }, [product])






  //handle Add variant
  const handleAddVariant = () => {
    setVariants(prev => ([...prev, productVariantData]))
    setFormValue(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          size: "",
          stock: 0,
          color: ""
        }
      ]
    }))
  }



  //Handle Remove variant
  const handleRemoveVariant = (variantIndex: number) => {
    let newVariants = variants.filter((_, index) => index !== variantIndex)
    setVariants(newVariants)

    setFormValue(prev => ({
      ...prev,
      variants: prev.variants.filter(
        (_, index) => index !== variantIndex
      )
    }))

  }



  //Handle FormData
  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === "price") {
      if (value === "") {
        setFormValue(prev => ({
          ...prev,
          price: 0
        }))

        return
      }

      if (!/^\d+$/.test(value)) {
        return
      }

      setFormValue(prev => ({
        ...prev,
        price: Number(value)
      }))
    } else {
      setFormValue(prev => ({
        ...prev,
        [name]: value
      }))
    }

    setError(prev => {
      const newError = { ...prev }

      delete newError[name as keyof ErrorType]

      return newError
    })
  }



  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, variantIndex: number) => {

    if (e.target.name === 'size' || e.target.name === 'color') {
      setFormValue(prev => (
        {
          ...prev,
          'variants': prev.variants.map((variant, index) =>
            index === variantIndex ? { ...variant, [e.target.name]: e.target.value } : variant
          )
        }
      ))
      return
    }
    if (e.target.name === 'stock') {


      let newError = stockError.filter(item => item !== variantIndex)
      setStockError(newError)



      if (e.target.value === "") {
        setFormValue(prev => ({
          ...prev,
          variants: prev.variants.map((variant, index) =>
            index === variantIndex
              ? { ...variant, stock: 0 }
              : variant
          )
        }))
        return
      }

      if (!/^\d+$/.test(e.target.value)) {
        return
      }
      setFormValue(prev => (
        {
          ...prev,
          'variants': prev.variants.map((variant, index) =>
            index === variantIndex ? { ...variant, [e.target.name]: Number(e.target.value) } : variant
          )
        }
      ))
      return
    }
  }


  //Handle Cancel Form
  const handleCancel = () => {
    setFormValue({
      productName: '',
      category: '',
      brand: '',
      price: 0,
      variants: [
        { size: '', stock: 0, color: '' }
      ]
    })
  }

  const handleEditProduct = () => {



    const localError: Partial<ErrorType> = {}

    if (!formValue.productName.trim()) {
      localError.productName = "Please fill product name"
    }

    if (!formValue.category.trim()) {
      localError.category = "Please fill category"
    }

    if (!formValue.brand.trim()) {
      localError.brand = "Please fill brand"
    }

    if (formValue.price === 0) {
      localError.price = "Please fill price"
    }

    // Check stock
    const zeroStockVariants = formValue.variants
      .map((variant, index) => variant.stock === 0 ? index : -1)
      .filter(index => index !== -1)

    setStockError(zeroStockVariants)

    // Check Zeeroes
    if (
      Object.keys(localError).length > 0 ||
      zeroStockVariants.length > 0
    ) {
      setError(localError)
      return
    }


    setError({})

    if (!productID) return
    editProduct({
      productID,
      value: formValue
    }, {
      onSuccess: (data) => {
        toast.success(data.message)

        setStockError([])

      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

  }


  return (
    <div className="flex flex-col gap-6 w-full min-h-[calc(100vh-48px)] ">
      <AdminPagesHeader first={'Products / Edit Product'}
        main={'Edit Product'} third={'Edit product with details, sizes and stock information.'}
        right={(
          <Button children={
            <p className="flex items-center gap-1">
              <IoIosArrowRoundBack /> Back to Products
            </p>
          } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
        )} />

      <div className="flex-1 gap-6 min-h-0 flex flex-col">
        <div className="grid gap-6">
          {/* Basic Information */}
          <TodayActivityLayout
            head="Product Information"
            btn="not"
            detail="Enter the product's basic details"
            icon={FaRegUser}
            children={(
              <div className="grid gap-4 md:grid-cols-3">
                {addProductData.map((item: AddProductType) => {
                  return <div className="grid gap-2 self-start" key={item.name}>
                    <div className="flex gap-2">
                      <label htmlFor={item.name}>{item.label}</label>
                      {item.required && (<p className="text-red-600">*</p>)}
                    </div>
                    <Input icon={false} item={item} onChange={handleFormData}
                      className={`${error[
                        item.name === "price"
                          ? "price"
                          : (item.name as
                            | "productName"
                            | "category"
                            | "brand")
                      ] ? 'border-red-500' : 'border-border'}`}
                      value={
                        item.name === "price"
                          ? formValue.price
                          : formValue[item.name as "productName" | "category" | "brand"]
                      } />
                    <p className={`${error[
                      item.name === "price"
                        ? "price"
                        : (item.name as
                          | "productName"
                          | "category"
                          | "brand")
                    ] ? 'block' : 'hidden'} text-red-500 text-sm`}>{error[
                      item.name === "price"
                        ? "price"
                        : (item.name as
                          | "productName"
                          | "category"
                          | "brand")
                    ]}</p>

                  </div>
                })}
              </div>
            )}
          />
        </div>


        <div className="grid gap-6">
          <TodayActivityLayout
            head="Product Variants"
            btn="show"
            btnData="Add variant"
            btnFun={handleAddVariant}
            detail="Add sizes and stock for this product"
            icon={FaBorderNone}
            children={(
              <div className="grid gap-6 items-start">
                {variants && variants.map((variant, index) => (
                  <div key={index} className="grid gap-4">
                    <h3 className="font-semibold text-[14px]">
                      Variant {index + 1}
                    </h3>
                    <div className="flex w-full gap-4">
                      {
                        variant.map((item) => (
                          <div className="grid gap-4 w-full" key={item.name}>
                            {
                              item.name === 'size' ? (
                                <div className="grid gap-2 self-start w-full" key={item.name}>
                                  <div className="flex gap-2 w-full">
                                    <label htmlFor={item.name}>{item.label}</label>
                                    {item.required && (<p className="text-red-600">*</p>)}
                                  </div>
                                  <select name={item.name} value={formValue.variants[index].size || ""}
                                    onChange={(e) => handleVariantChange(e, index)}
                                    className="border-border w-full border px-2 py-3 rounded-md">
                                    <option value="" disabled>
                                      {item.placeholder}
                                    </option>
                                    {item?.options?.map(val => {
                                      return <option value={val} key={val}>{val}</option>
                                    })}
                                  </select>
                                </div>
                              ) : item.name === 'stock' ? (
                                <div className="grid gap-2 w-full self-start" key={item.name}>
                                  <div className="flex gap-2">
                                    <label htmlFor={item.name}>{item.label}</label>
                                    {item.required && (<p className="text-red-600">*</p>)}
                                  </div>
                                  <Input icon={false} item={item} onChange={(e) => handleVariantChange(e, index)}
                                    value={formValue.variants[index].stock ?? 0} className={`${stockError.includes(index) ? 'border-red-500' : 'border-border'} w-full`} />
                                  <p className={`text-sm ${stockError.includes(index) ? 'block' : 'hidden'} text-red-500`}>Please add stock</p>
                                </div>
                              ) :
                                (
                                  <div className="grid gap-2 w-full self-start" key={item.name}>
                                    <div className="flex gap-2">
                                      <label htmlFor={item.name}>{item.label}</label>
                                      {item.required && (<p className="text-red-600">*</p>)}
                                    </div>
                                    <Input icon={false} item={item} onChange={(e) => handleVariantChange(e, index)}
                                      value={formValue.variants[index].color || ''} className={'border-border'} />
                                  </div>
                                )
                            }
                          </div>
                        ))
                      }

                      <Button children={<FaRegTrashAlt />} onClick={() => handleRemoveVariant(index)}
                        className={`self-end bg-red-500 text-white px-4 py-4 ${formValue.variants.length === 1 ? "hidden" : "block"}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      <CustomerPagesFooter btn1Text={'Cancel'} btn1ClickFun={handleCancel}
        btn2Text={'Update Product'} btn2ClickFun={handleEditProduct} />
    </div>
  )
}

export default EditProduct