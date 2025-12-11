// 'use client'

import PageWrapper from "@/components/custom/page-wrapper"
import data from "./data.json"

import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive'
import { DataTable } from '@/components/dashboard/data-table'
import { SectionCards } from '@/components/dashboard/section-cards'
import { Metadata } from "next"
import React from 'react'
// import { metadata } from "../layout"


export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Join StackOS early access - an AI-powered growth intelligence suite for modern businesses.",
}


export default function page() {
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
            <DataTable data={data} />
          </div>
        </div>
      </div>

    </PageWrapper>
  )
}
