import { useNavigate, useParams } from "react-router-dom"
import { customersData } from "../../static/CustomersData"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { FaRegUser } from "react-icons/fa";
import { AdditionalInformationData, CustomerBasicInformationData, CustomerSizeData } from "../../static/CustomerBasicInformation";
import { Input } from "../../components/ui/Input";
import { useState } from "react";
import { IoShirtOutline } from "react-icons/io5";

function EditCustomer() {
    const { id } = useParams()
    const [formValue, setFormValue] = useState<Record<string, string>>({});
    const navigate = useNavigate()
    const customer = customersData.filter(item => item.id === Number(id))

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValue(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="grid gap-6">
            <AdminPagesHeader first={'Customers / Edit Customer'}
                main={'Edit Details'} third={"Update customer's."}
                right={(
                    <button className="border-border border px-2 py-2 cursor-pointer rounded-lg text-[12px]
                shadow bg-orange-dark text-white shrink-0" onClick={() => navigate('/dashboard/customers')}>
                        Back to Customers
                    </button>
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

            <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-2">
                <button className="px-4 py-2 border rounded-lg border-border">Cancel</button>
                <button className="px-4 py-2 border rounded-lg bg-orange-dark text-white border-border">Update Customer</button>
            </div>


        </div>
    )
}

export default EditCustomer