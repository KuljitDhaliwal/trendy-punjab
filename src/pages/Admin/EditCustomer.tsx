import { useNavigate } from "react-router-dom"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { FaRegUser } from "react-icons/fa";
import { AdditionalInformationData, CustomerBasicInformationData, CustomerSizeData } from "../../static/CustomerBasicInformation";
import { Input } from "../../components/ui/Input";
import { useState } from "react";
import { IoShirtOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "../../components/ui/Button";
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter";

function EditCustomer() {
    const [formValue, setFormValue] = useState<Record<string, string>>({});
    const navigate = useNavigate()

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValue(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCancel = () => {

    }

    const handleUpdateCustomer = () => {
        
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
                    <div className="grid gap-4 md:grid-cols-3">
                        {CustomerBasicInformationData.map(item => {
                            return <div className="grid gap-2">
                                <div className="flex gap-2">
                                    <label htmlFor={item.name}>{item.label}</label>
                                    {item.required && (<p className="text-red-600">*</p>)}
                                </div>
                                <Input icon={false} item={item} onChange={handleFormData} className={`border-border`}
                                    value={formValue[item.name] || ''} type={'text'} />
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
                            return <div className="grid gap-2">
                                <label htmlFor={item.name}>{item.label}</label>
                                <select className="border-border border p-2 rounded-md">
                                    {item.options.map(val => {
                                        return <option value={val}>{val}</option>
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
                                    value={formValue[item.name] || ''} type={'text'} />
                            </div>
                        })}
                    </div>
                )}
            />

            {/* Quick Actions  */}
            <CustomerPagesFooter btn1Text="Cancel" btn2Text="Update Customer"
            btn1ClickFun={handleCancel} btn2ClickFun={handleUpdateCustomer}/>
        </div>
    )
}

export default EditCustomer