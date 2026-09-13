export type CustomerBasicInformation = {
  name: string
  label: string
  placeholder: string
  type: "text" | "tel" | "email"
  required?: boolean
}

export const CustomerBasicInformationData: CustomerBasicInformation[] = [
  {
    name: "fullname",
    label: "Full Name",
    placeholder: "Enter customer name",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
    type: "tel",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email address",
    type: "email",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter house number, street or locality",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter city",
    type: "text",
  },
  {
    name: "state",
    label: "State",
    placeholder: "Enter state",
    type: "text",
  },
  {
    name: "pincode",
    label: "PIN Code",
    placeholder: "Enter PIN code",
    type: "tel",
  },
]


export type CustomerSize = {
  name: string
  label: string
  placeholder: string
  options: string[]
}

export const CustomerSizeData: CustomerSize[] = [
  {
    name: "shirtSize",
    label: "Shirt Size",
    placeholder: "Select size",
    options: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
    ],
  },
  {
    name: "shirtFit",
    label: "Shirt Fit",
    placeholder: "Select fit",
    options: [
      "Regular",
      "Slim Fit",
      "Skinny Fit",
      "Relaxed Fit",
    ],
  },
  {
    name: "tshirtSize",
    label: "T-Shirt Size",
    placeholder: "Select size",
    options: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
    ],
  },
  {
    name: "jeansSize",
    label: "Jeans / Trouser Size",
    placeholder: "Select size",
    options: [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
      "44",
    ],
  },
  {
    name: "jeansFit",
    label: "Jeans / Trouser Fit",
    placeholder: "Select fit",
    options: [
      "Regular",
      "Slim Fit",
      "Skinny Fit",
      "Relaxed Fit",
    ],
  },
  {
    name: "jacketSize",
    label: "Jacket Size",
    placeholder: "Select size",
    options: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
    ],
  },
  {
    name: "shoeSize",
    label: "Shoe Size",
    placeholder: "Select size",
    options: [
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ],
  },
]







export type AdditionalInformation = {
  name: string
  label: string
  placeholder: string
}

export const AdditionalInformationData: AdditionalInformation[] = [
  {
    name: "notes",
    label: "Notes",
    placeholder: "e.g. prefers slim fit, likes blue color, regular customer, etc.",
  },
]


export type QuickNote = {
  id: number
  label: string
}

export const QuickNoteData: QuickNote[] = [
  {
    id: 1,
    label: "Regular customer",
  },
  {
    id: 2,
    label: "Prefers slim fit",
  },
  {
    id: 3,
    label: "Likes blue color",
  },
  {
    id: 4,
    label: "Prefers loose fit",
  },
  {
    id: 5,
    label: "VIP customer",
  },
  {
    id: 6,
    label: "Frequent visitor",
  },
]