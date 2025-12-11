import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { useDeviceStore } from "@/store/device.store"

interface BreadcrumbItem {
    name: string
    path: string
}

export const CustomBreadcrumbs: React.FC = () => {
    const location = useLocation()
    const { deviceid } = useParams()
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])
    const { currentDevice, fetchDeviceById } = useDeviceStore()
    const [loadingDevice, setLoadingDevice] = useState(false)

    useEffect(() => {
        const paths = location.pathname.split("/").filter(Boolean)
        const crumbs: BreadcrumbItem[] = []
        let accumulatedPath = ""

        paths.forEach((p) => {
            accumulatedPath += `/${p}`
            crumbs.push({ name: p, path: accumulatedPath })
        })

        setBreadcrumbs(crumbs)
    }, [location.pathname])

    // Fetch device name if deviceid exists
    useEffect(() => {
        if (deviceid && (!currentDevice || currentDevice.id !== deviceid)) {
            setLoadingDevice(true)
            fetchDeviceById(deviceid).finally(() => setLoadingDevice(false))
        }
    }, [deviceid, currentDevice, fetchDeviceById])

    return (
        <nav className="flex items-center space-x-2 text-sm ">
            <Link to="/">Home</Link>
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1

                // Show device name instead of ID
                const displayName =
                    crumb.name === deviceid
                        ? loadingDevice
                            ? "Loading..."
                            : currentDevice?.deviceName || crumb.name
                        : crumb.name

                return (
                    <span key={crumb.path} className="flex items-center">
                        <span className="mx-1">/</span>
                        {isLast ? (
                            <span className="font-medium">{displayName}</span>
                        ) : (
                            <Link to={crumb.path} className="hover:underline">
                                {displayName}
                            </Link>
                        )}
                    </span>
                )
            })}
        </nav>
    )
}
