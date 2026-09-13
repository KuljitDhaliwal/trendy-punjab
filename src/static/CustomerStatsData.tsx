type CustomerStat = {
  label: string
  value: string
  description?: string
}

export const CustomerStatData: CustomerStat[] = [
  {
    label: "Total customers",
    value: "1,284",
  },
  {
    label: "New this month",
    value: "48",
  },
  {
    label: "Active customers",
    value: "936",
    description: "Visited in the last 90 days",
  },
]