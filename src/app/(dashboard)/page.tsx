"use client"

import PageWrapper from "@/components/custom/page-wrapper"
// import data from "./data.json" // Remove this line

import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive'
import { DataTable } from '@/components/dashboard/data-table'
import { SectionCards } from '@/components/dashboard/section-cards'
import { Metadata } from "next"
import React from 'react'
import { useGetDashboardStatsQuery } from "@/features/dashboard/services/dashboardApi" // Import the hook
// import { metadata } from "../layout"





export default function page() {
  const { data, isLoading, isError } = useGetDashboardStatsQuery(); // Use the hook

  // Handle loading and error states for the entire page if necessary,
  // or let individual components handle it. PageWrapper already handles initial loading.

  const tableData = data?.data?.tableData || []; // Extract tableData

  return (
    <PageWrapper
      title="Dashboard"
      subtitle="Dashboard detail and overivew for you brand"
      showInitialLoadingOnly
    >

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 ">
            <SectionCards />
            <div className="">
              <ChartAreaInteractive />
            </div>
            {/* Pass tableData to DataTable */}
            <DataTable data={tableData} />
          </div>
        </div>
      </div>

    </PageWrapper>
  )
}
