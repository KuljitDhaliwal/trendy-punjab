import type { ReactNode } from "react"
import SettingsNavbar from "./SettingsNavbar"

type SettingsType = {
    children: ReactNode
}

function SettingsLayout({children}: SettingsType) {
    return (
        <div className="grid md:grid-cols-[2fr_1fr] gap-4 flex-1">
            <div>{children}</div>
            <SettingsNavbar />
        </div>
    )
}

export default SettingsLayout