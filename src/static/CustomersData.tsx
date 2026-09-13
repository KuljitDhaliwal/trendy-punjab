type Customer = {
  id: number
  initials: string
  name: string
  customerSince: number
  phone: string
  shirtSize: string
  jeansSize: string
  lastVisit: string
  orders: number
  totalSpent: string
}

export const customersData: Customer[] = [
  {
    id: 1,
    initials: "KS",
    name: "Kuljit Singh",
    customerSince: 2022,
    phone: "98765XXXXX",
    shirtSize: "Shirt L",
    jeansSize: "Jeans 32",
    lastVisit: "Today",
    orders: 12,
    totalSpent: "₹24,590",
  },
  {
    id: 2,
    initials: "SK",
    name: "Simran Kaur",
    customerSince: 2023,
    phone: "98765XXXXX",
    shirtSize: "Shirt M",
    jeansSize: "Jeans 30",
    lastVisit: "Yesterday",
    orders: 7,
    totalSpent: "₹14,200",
  },
  {
    id: 3,
    initials: "AV",
    name: "Aman Verma",
    customerSince: 2024,
    phone: "98765XXXXX",
    shirtSize: "Shirt XL",
    jeansSize: "Jeans 34",
    lastVisit: "12 Aug 2026",
    orders: 5,
    totalSpent: "₹9,850",
  },
  {
    id: 4,
    initials: "MS",
    name: "Maria Sharma",
    customerSince: 2021,
    phone: "98765XXXXX",
    shirtSize: "Shirt S",
    jeansSize: "Jeans 28",
    lastVisit: "10 Aug 2026",
    orders: 9,
    totalSpent: "₹18,400",
  },
  {
    id: 5,
    initials: "HK",
    name: "Harpreet Kaur",
    customerSince: 2024,
    phone: "98765XXXXX",
    shirtSize: "Shirt M",
    jeansSize: "Jeans 30",
    lastVisit: "08 Aug 2026",
    orders: 3,
    totalSpent: "₹6,450",
  },
]