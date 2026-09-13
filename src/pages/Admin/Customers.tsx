import { useState } from "react"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import FindCustomers from "../../features/admin/components/FindCustomers"
import { CustomerStatData } from "../../static/CustomerStatsData"
import { customersData } from "../../static/CustomersData"
import { useNavigate } from "react-router-dom"


type BtnType = {
  name: string,
  label: string
}

const Btns: BtnType[] = [
  {
    name: 'allcustomers',
    label: 'All Customers'
  },
  {
    name: 'recentcustomers',
    label: 'Recent Customers'
  },
  {
    name: 'activecustomers',
    label: 'Active Customers'
  },
]

function Customers() {
  
  const [filterBtn, setFilterBtn] = useState('allcustomers')
  const navigate = useNavigate()

  const handleFilterBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilterBtn(e.currentTarget.name)
  }
  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={'Customer records'}
        main={'Customers'} third={'Manage customer information, sizes, measurements and order history.'}
        right={(
          <button className="border-border border px-2 py-2 rounded-lg text-[12px]
                shadow bg-orange-dark text-white shrink-0" onClick={()=>navigate('add-customer')}>
                  + Add Customer
                </button>
        )} />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {CustomerStatData.map(item => {
          return <div key={item.label} className="bg-orange-light w-full rounded-lg shadow p-4">
            <p className="text-[12px] text-secondary-text">{item.label}</p>
            <p className="font-bold text-lg">{item.value}</p>
            <p className="text-[12px] text-secondary-text">{item.description}</p>
          </div>
        })}
      </div>

      <FindCustomers/>

      <div className="bg-orange-light p-4 rounded-lg shadow grid gap-4">
        <div className="flex justify-between">
          <div className="grid gap-2">
            <p className="font-bold">All Customers</p>
            <p className="text-[12px] text-secondary-text">1248 customer records</p>
          </div>
          <div className="btns p-0 border-border border-2 rounded-md flex self-center">
            {Btns.map(item=> {
              return <button className={`${filterBtn === item.name ? 
                'bg-white border-secondary-text' : 
                'border-transparent'} px-4 text-[12px] 
                rounded-md cursor-pointer border transition-all duration-300 py-2`} 
              name={item.name} onClick={(e)=>handleFilterBtn(e)}>{item.label}</button>
            })}
          </div>
        </div>
        <table className="text-sm">
            <thead className="text-left text-secondary-text uppercase text-[12px]">
              <th>customer</th>
              <th>phone</th>
              <th>sizes</th>
              <th>last visit</th>
              <th>orders</th>
              <th>total spent</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {customersData.map(item=> {
                console.log('Item', item)
                return <tr key={item.id} className="py-2 border-b border-secondary-text/20">
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.phone}</td>
                  <td className="py-3">{item.shirtSize}{item.jeansSize}</td>
                  <td className="py-3">{item.lastVisit}</td>
                  <td className="py-3">{item.orders}</td>
                  <td className="py-3">{item.totalSpent}</td>
                  <td><button type="button" className="underline cursor-pointer" 
                  onClick={()=>navigate(`/dashboard/customers/${item.id}`)}>View</button></td>
                </tr>
              })}
            </tbody>
        </table>
      </div>

    </div >
  )
}

export default Customers