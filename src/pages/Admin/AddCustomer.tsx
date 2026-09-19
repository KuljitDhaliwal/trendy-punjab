import { useNavigate } from "react-router-dom";
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { IoIosArrowRoundBack } from "react-icons/io";
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout";
import { FaRegUser } from "react-icons/fa";
import { AdditionalInformationData, CustomerBasicInformationData, CustomerSizeData } from "../../static/CustomerBasicInformation";
import { Input } from "../../components/ui/Input";
import React, { useState } from "react";
import { IoShirtOutline } from "react-icons/io5";
import Button from "../../components/ui/Button";
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter";
import { useCreateCustomer } from "../../features/admin/api/admin.mutations";
import { toast } from "react-toastify";

function AddCustomer() {
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState<Record<string, string>>({});
    const [required, setRequired] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const phoneRegex = /^[0-9]{0,10}$/
    //Create Customer API Call
    const { mutate: createCustomer } = useCreateCustomer()
    //FormData
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


    //Handle Cancel Form
    const handleCancel = () => {
        setFormValue({})
    }

    const handleAddCustomer = () => {
        if ((formValue.fullname === undefined || formValue.fullname === '') ||
            (formValue.phone === undefined || formValue.phone === '')) {
            setRequired(true)
            return
        }

        if(formValue.phone.length < 10){
            setPhoneError(true)
            return
        }


        createCustomer(formValue, {
            onSuccess: (data) => {
                toast.success(data.message)
                setFormValue({})
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })

    }

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <AdminPagesHeader first={'Customers / Add Customer'}
                main={'Add Customer'} third={'Create new customer profile with sizes and measurements.'}
                right={(
                    <Button children={
                        <p className="flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back to Customers
                        </p>
                    } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
                )} />


            <div className="flex-1 h-full grid gap-6">
                {/* Basic Information */}
                <TodayActivityLayout
                    head="Basic Information"
                    btn="not"
                    detail="Enter the customer's basic details"
                    icon={FaRegUser}
                    children={(
                        <div className="grid gap-4 md:grid-cols-3">
                            {CustomerBasicInformationData.map(item => {
                                return <div className="grid gap-2 self-start" key={item.name}>
                                    <div className="flex gap-2">
                                        <label htmlFor={item.name}>{item.label}</label>
                                        {item.required && (<p className="text-red-600">*</p>)}
                                    </div>
                                    <Input icon={false} item={item} onChange={handleFormData}
                                        className={`${(item.required && (formValue[item.name] === undefined || formValue[item.name] === '') && required) ? 'border-red-500' : 'border-border'}`}
                                        value={formValue[item.name] || ''} type={'text'} />
                                    {(item.required && (formValue[item.name] === undefined || formValue[item.name] === '') && required) && (
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
                                    <select name={item.name} value={formValue[item.name] || ""}
                                        onChange={(e) => handleFormData(e)}
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

                {/* Additional Information */}
                <TodayActivityLayout
                    head="Standard Sizes"
                    btn="not"
                    detail="Save their commonly used sizes"
                    icon={IoShirtOutline}
                    children={(
                        <div className="grid gap-4 ">
                            {AdditionalInformationData.map(item => {
                                return <div className="grid gap-2" key={item.name}>
                                    <label htmlFor={item.name}>{item.label}</label>
                                    <Input icon={false} item={item} onChange={handleFormData}
                                        value={formValue[item.name] || ''} className="border-border" type={'text'} />
                                </div>
                            })}
                        </div>
                    )}
                />
            </div>
            <CustomerPagesFooter btn1Text={'Cancel'} btn1ClickFun={handleCancel}
                btn2Text={'Add Customer'} btn2ClickFun={handleAddCustomer} />
        </div>
    )
}

export default AddCustomer