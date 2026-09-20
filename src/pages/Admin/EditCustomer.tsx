import { useNavigate, useParams } from "react-router-dom"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { FaRegUser } from "react-icons/fa";
import { AdditionalInformationData, CustomerBasicInformationData, CustomerSizeData } from "../../static/CustomerBasicInformation";
import { Input } from "../../components/ui/Input";
import { useEffect, useState } from "react";
import { IoShirtOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "../../components/ui/Button";
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter";
import { useEditCustomer, useGetCustomer } from "../../features/admin/api/admin.mutations";
import { toast } from "react-toastify";


export type CustomerFormData = {
    fullname: string
    phone: string
    email?: string
    address?: string
    city?: string
    state?: string
    pincode?: string
    shirtSize?: string
    shirtFit?: string
    tshirtSize?: string
    jeansSize?: string
    jeansFit?: string
    jacketSize?: string
    shoeSize?: string
    notes?: string
}



function EditCustomer() {
    const [original, setOriginal] = useState<CustomerFormData>()
    const [formValue, setFormValue] = useState<CustomerFormData>({
        fullname: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        shirtSize: "",
        shirtFit: "",
        tshirtSize: "",
        jeansSize: "",
        jeansFit: "",
        jacketSize: "",
        shoeSize: "",
        notes: "",
    })
    const [required, setRequired] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const navigate = useNavigate()
    const { id: customerID } = useParams()
    const { mutate: getCustomer } = useGetCustomer()
    const { mutate: editCustomer } = useEditCustomer()
    const phoneRegex = /^[0-9]{0,10}$/

    //Get User Details
    useEffect(() => {
        if (customerID) {
            getCustomer(customerID, {
                onSuccess: (data) => {
                    const customer = data.customer
                    const customerData: CustomerFormData = {
                        fullname: customer.fullname ?? "",
                        phone: customer.phone ?? "",
                        email: customer.email ?? "",
                        address: customer.address ?? "",
                        city: customer.city ?? "",
                        state: customer.state ?? "",
                        pincode: customer.pincode ?? "",
                        shirtSize: customer.shirtSize ?? "",
                        shirtFit: customer.shirtFit ?? "",
                        tshirtSize: customer.tshirtSize ?? "",
                        jeansSize: customer.jeansSize ?? "",
                        jeansFit: customer.jeansFit ?? "",
                        jacketSize: customer.jacketSize ?? "",
                        shoeSize: customer.shoeSize ?? "",
                        notes: customer.notes ?? "",
                    }
                    setFormValue(customerData)
                    setOriginal(customerData)
                },
                onError: (error) => {
                    console.log(error.message)
                }
            })
        }
    }, [customerID, getCustomer])


    const getFormValue = (name: string) => {
        return formValue[name as keyof CustomerFormData] || ""
    }

    const hasChanged = JSON.stringify(formValue) !== JSON.stringify(original)

    //Handle From Data
    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        if (name === 'phone') {
            if (value.length < 10 || !phoneRegex.test(value)) {
                setPhoneError(true)
                setFormValue(prev => ({
                    ...prev,
                    [name]: value
                }))
                return
            }
        }
        setPhoneError(false)
        if ((formValue.fullname !== undefined &&
            formValue.fullname !== '') &&
            (formValue.phone !== undefined && formValue.phone !== '')) {
            setRequired(false)
        }
        setFormValue(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCancel = () => {
        if (customerID) {
            getCustomer(customerID, {
                onSuccess: (data) => {
                    const customer = data.customer
                    setFormValue({
                        fullname: customer.fullname ?? "",
                        phone: customer.phone ?? "",
                        email: customer.email ?? "",
                        address: customer.address ?? "",
                        city: customer.city ?? "",
                        state: customer.state ?? "",
                        pincode: customer.pincode ?? "",
                        shirtSize: customer.shirtSize ?? "",
                        shirtFit: customer.shirtFit ?? "",
                        tshirtSize: customer.tshirtSize ?? "",
                        jeansSize: customer.jeansSize ?? "",
                        jeansFit: customer.jeansFit ?? "",
                        jacketSize: customer.jacketSize ?? "",
                        shoeSize: customer.shoeSize ?? "",
                        notes: customer.notes ?? "",
                    })

                },
                onError: (error) => {
                    console.log(error.message)
                }
            })
        }
    }


    //Handle Update Customer
    const handleUpdateCustomer = () => {
        if ((formValue.fullname === undefined || formValue.fullname === '') ||
            (formValue.phone === undefined || formValue.phone === '')) {
            setRequired(true)
            return
        }

        if (formValue.phone.length < 10) {
            setPhoneError(true)
            return
        }
        if (!customerID) return
        editCustomer({
            customerID,
            value: formValue
        }, {
            onSuccess: () => {
                toast.success('Customer details updated!', {
                    autoClose: 1800
                })

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })

                setTimeout(() => {
                    navigate(`/dashboard/customers/${customerID}`)
                }, 2000)

            },
            onError: () => {
                console.log('Edit Customer error!')
            }
        })
    }

    return (
        <div className="grid gap-6">
            <AdminPagesHeader first={'Customers / Edit Customer'}
                main={'Edit Details'} third={"Update customer's."}
                right={(
                    <Button children={
                        <p className="flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back to Customers
                        </p>
                    } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
                )} />


            {/* Edit Basic Information */}
            <TodayActivityLayout
                head="Basic Information"
                btn="not"
                detail="Enter the customer's basic details"
                icon={FaRegUser}
                children={(
                    <div className="grid gap-4 md:grid-cols-3 items-start">
                        {CustomerBasicInformationData.map(item => {
                            return <div className="grid gap-2">
                                <div className="flex gap-2">
                                    <label htmlFor={item.name}>{item.label}</label>
                                    {item.required && (<p className="text-red-600">*</p>)}
                                </div>
                                <Input icon={false} item={item} onChange={handleFormData} className={`border-border`}
                                    value={getFormValue(item.name)} type={'text'} />
                                {(item.required && (getFormValue(item.name) === undefined || getFormValue(item.name) === '') && required) && (
                                    <p className="text-red-400">{`Please fill ${item.label}`}</p>
                                )}
                                {item.name === 'phone' && phoneError && (<p className="text-red-400">{`Please enter valid phone number only!`}</p>)}
                            </div>
                        })}
                    </div>
                )}
            />


            {/* Standard Size */}
            <TodayActivityLayout
                head="Standard Sizes"
                btn="not"
                detail="Save their commonly used sizes"
                icon={IoShirtOutline}
                children={(
                    <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
                        {CustomerSizeData.map(item => {
                            return <div className="grid gap-2" key={item.name}>
                                <label htmlFor={item.name}>{item.label}</label>
                                <select name={item.name} value={getFormValue(item.name)}
                                    onChange={handleFormData}
                                    className="border-border border p-2 rounded-md">
                                    <option value="" disabled>
                                        {item.placeholder}
                                    </option>
                                    {item.options.map(val => {
                                        return <option value={val} key={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                        })}
                    </div>
                )}
            />

            {/* Notes */}

            <TodayActivityLayout
                head="Notes"
                btn="not"
                detail="Additional notes about this customer"
                icon={IoShirtOutline}
                children={(
                    <div className="grid gap-4">
                        {AdditionalInformationData.map(item => {
                            return <div className="grid gap-2">
                                <label htmlFor={item.name}>{item.label}</label>
                                <Input icon={false} item={item} onChange={handleFormData} className={`border-border`}
                                    value={getFormValue(item.name)} type={'text'} />
                            </div>
                        })}
                    </div>
                )}
            />

            {/* Quick Actions  */}
            <CustomerPagesFooter btn1Text="Cancel" btn2Text="Update Customer" btn2disabled={!hasChanged}
                btn1ClickFun={handleCancel} btn2ClickFun={handleUpdateCustomer} />
        </div>
    )
}

export default EditCustomer