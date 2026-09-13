type CustomerOrder = {
  id: string
  date: string
  items: number
  amount: string
}

type Customer = {
  id: number
  initials: string
  name: string
  customerSince: number
  phone: string
  email: string
  dateOfBirth: string
  gender: string

  shirtSize: string
  tshirtSize: string
  jeansSize: string
  jacketSize: string
  shoeSize: string

  chest: number
  waist: number
  shoulder: number
  sleeveLength: number
  inseam: number

  lastVisit: string
  firstVisit: string
  orders: number
  totalSpent: string

  notes: string
  orderHistory: CustomerOrder[]
}

export const customersData: Customer[] = [
  {
    id: 1,
    initials: "KS",
    name: "Kuljit Singh",
    customerSince: 2024,
    phone: "98765XXXXX",
    email: "kuljit.singh@example.com",
    dateOfBirth: "12 Mar 1992",
    gender: "Male",

    shirtSize: "L",
    tshirtSize: "L",
    jeansSize: "32",
    jacketSize: "M",
    shoeSize: "9",

    chest: 96,
    waist: 82,
    shoulder: 44,
    sleeveLength: 62,
    inseam: 76,

    lastVisit: "Today",
    firstVisit: "10 Aug 2024",
    orders: 12,
    totalSpent: "₹24,590",

    notes: "Regular customer. Prefers slim fit. Likes blue and black colors.",

    orderHistory: [
      {
        id: "#1001",
        date: "12 Aug 2026",
        items: 2,
        amount: "₹4,299",
      },
      {
        id: "#0987",
        date: "28 Jul 2026",
        items: 1,
        amount: "₹2,199",
      },
      {
        id: "#0965",
        date: "10 Jul 2026",
        items: 3,
        amount: "₹5,999",
      },
      {
        id: "#0944",
        date: "18 Jun 2026",
        items: 1,
        amount: "₹1,499",
      },
      {
        id: "#0912",
        date: "02 Jun 2026",
        items: 2,
        amount: "₹3,850",
      },
    ],
  },

  {
    id: 2,
    initials: "SK",
    name: "Simran Kaur",
    customerSince: 2023,
    phone: "98765XXXXX",
    email: "simran.kaur@example.com",
    dateOfBirth: "24 Jun 1995",
    gender: "Female",

    shirtSize: "M",
    tshirtSize: "M",
    jeansSize: "30",
    jacketSize: "M",
    shoeSize: "7",

    chest: 88,
    waist: 72,
    shoulder: 39,
    sleeveLength: 58,
    inseam: 74,

    lastVisit: "Yesterday",
    firstVisit: "18 May 2023",
    orders: 7,
    totalSpent: "₹14,200",

    notes: "Prefers comfortable fit and light colors.",

    orderHistory: [
      {
        id: "#0876",
        date: "11 Aug 2026",
        items: 2,
        amount: "₹3,499",
      },
      {
        id: "#0812",
        date: "22 Jul 2026",
        items: 1,
        amount: "₹1,799",
      },
      {
        id: "#0745",
        date: "05 Jun 2026",
        items: 2,
        amount: "₹3,299",
      },
      {
        id: "#0698",
        date: "18 Apr 2026",
        items: 1,
        amount: "₹2,199",
      },
    ],
  },

  {
    id: 3,
    initials: "AV",
    name: "Aman Verma",
    customerSince: 2024,
    phone: "98765XXXXX",
    email: "aman.verma@example.com",
    dateOfBirth: "08 Nov 1990",
    gender: "Male",

    shirtSize: "XL",
    tshirtSize: "XL",
    jeansSize: "34",
    jacketSize: "L",
    shoeSize: "10",

    chest: 104,
    waist: 90,
    shoulder: 46,
    sleeveLength: 64,
    inseam: 80,

    lastVisit: "12 Aug 2026",
    firstVisit: "05 Jul 2024",
    orders: 5,
    totalSpent: "₹9,850",

    notes: "",

    orderHistory: [
      {
        id: "#0854",
        date: "12 Aug 2026",
        items: 2,
        amount: "₹3,299",
      },
      {
        id: "#0765",
        date: "14 Jul 2026",
        items: 1,
        amount: "₹1,999",
      },
      {
        id: "#0612",
        date: "20 May 2026",
        items: 2,
        amount: "₹2,850",
      },
    ],
  },

  {
    id: 4,
    initials: "MS",
    name: "Maria Sharma",
    customerSince: 2021,
    phone: "98765XXXXX",
    email: "maria.sharma@example.com",
    dateOfBirth: "17 Feb 1993",
    gender: "Female",

    shirtSize: "S",
    tshirtSize: "S",
    jeansSize: "28",
    jacketSize: "S",
    shoeSize: "6",

    chest: 84,
    waist: 68,
    shoulder: 37,
    sleeveLength: 56,
    inseam: 72,

    lastVisit: "10 Aug 2026",
    firstVisit: "22 Mar 2021",
    orders: 9,
    totalSpent: "₹18,400",

    notes: "Frequent visitor. Prefers regular fit.",

    orderHistory: [
      {
        id: "#0842",
        date: "10 Aug 2026",
        items: 2,
        amount: "₹3,999",
      },
      {
        id: "#0798",
        date: "19 Jul 2026",
        items: 1,
        amount: "₹2,499",
      },
      {
        id: "#0711",
        date: "02 Jun 2026",
        items: 3,
        amount: "₹4,299",
      },
      {
        id: "#0645",
        date: "14 Apr 2026",
        items: 1,
        amount: "₹1,899",
      },
    ],
  },

  {
    id: 5,
    initials: "HK",
    name: "Harpreet Kaur",
    customerSince: 2024,
    phone: "98765XXXXX",
    email: "harpreet.kaur@example.com",
    dateOfBirth: "03 Sep 1998",
    gender: "Female",

    shirtSize: "M",
    tshirtSize: "M",
    jeansSize: "30",
    jacketSize: "M",
    shoeSize: "7",

    chest: 90,
    waist: 74,
    shoulder: 40,
    sleeveLength: 59,
    inseam: 75,

    lastVisit: "08 Aug 2026",
    firstVisit: "14 Jan 2024",
    orders: 3,
    totalSpent: "₹6,450",

    notes: "",

    orderHistory: [
      {
        id: "#0821",
        date: "08 Aug 2026",
        items: 1,
        amount: "₹2,199",
      },
      {
        id: "#0697",
        date: "12 Jun 2026",
        items: 2,
        amount: "₹2,799",
      },
      {
        id: "#0524",
        date: "20 Mar 2026",
        items: 1,
        amount: "₹1,452",
      },
    ],
  },
]