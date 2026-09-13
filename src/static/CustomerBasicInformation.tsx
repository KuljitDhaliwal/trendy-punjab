// import type { IconType } from "react-icons"
// import {
//   FiUser,
//   FiShirt,
//   FiRuler,
//   FiFileText,
// } from "react-icons/fi"

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
]


export type CustomerSize = {
  name: string
  label: string
  placeholder: string
}

export const CustomerSizeData: CustomerSize[] = [
  {
    name: "shirtSize",
    label: "Shirt Size",
    placeholder: "Select size",
  },
  {
    name: "tshirtSize",
    label: "T-Shirt Size",
    placeholder: "Select size",
  },
  {
    name: "jeansSize",
    label: "Jeans / Trouser Size",
    placeholder: "Select size",
  },
  {
    name: "jacketSize",
    label: "Jacket Size",
    placeholder: "Select size",
  },
  {
    name: "shoeSize",
    label: "Shoe Size",
    placeholder: "Select size",
  },
]


export type BodyMeasurement = {
  name: string
  label: string
  placeholder: string
  unit: string
}

export const BodyMeasurementData: BodyMeasurement[] = [
  {
    name: "chest",
    label: "Chest",
    placeholder: "e.g. 96",
    unit: "cm",
  },
  {
    name: "waist",
    label: "Waist",
    placeholder: "e.g. 82",
    unit: "cm",
  },
  {
    name: "shoulder",
    label: "Shoulder",
    placeholder: "e.g. 44",
    unit: "cm",
  },
  {
    name: "sleeveLength",
    label: "Sleeve Length",
    placeholder: "e.g. 62",
    unit: "cm",
  },
  {
    name: "inseam",
    label: "Inseam",
    placeholder: "e.g. 76",
    unit: "cm",
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