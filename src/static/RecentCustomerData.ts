export type RecentCustomer = {
  id: number
  name: string
  phone: string
  lastVisit: string
  lastPurchase: number
}

export const RecentCustomerData: RecentCustomer[] = [
  {
    id: 1,
    name: "Kuljit Singh",
    phone: "98765XXXXX",
    lastVisit: "Today",
    lastPurchase: 3499,
  },
  {
    id: 2,
    name: "Simran Kaur",
    phone: "98765XXXXX",
    lastVisit: "Yesterday",
    lastPurchase: 2199,
  },
  {
    id: 3,
    name: "Aman Verma",
    phone: "98765XXXXX",
    lastVisit: "Yesterday",
    lastPurchase: 5899,
  },
  {
    id: 4,
    name: "Harpreet Kaur",
    phone: "98765XXXXX",
    lastVisit: "14 Aug",
    lastPurchase: 4750,
  },
]