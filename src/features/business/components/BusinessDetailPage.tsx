"use client";

import { useEffect } from "react";
import { useBusiness } from "../hooks/useBusiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function BusinessDetailPage() {
    const {
        currentBusiness,
    } = useBusiness();


    return (

        <Card className=" mt-6 bg-neutral-900 border border-white/10 w-full
        ">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-white">
                    {currentBusiness!.name}
                </CardTitle>


            </CardHeader>

            <CardContent className="space-y-6 text-white">
                {/* Business Info */}
                <section>
                    <h3 className="font-semibold text-lg mb-2">Business Overview</h3>

                    <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {currentBusiness!.name}</p>
                        <p><strong>Category:</strong> {currentBusiness!.category || "N/A"}</p>
                        <p><strong>Description:</strong> {currentBusiness!.description || "N/A"}</p>
                        {/* <p><strong>Website:</strong> {currentBusiness!.website || "N/A"}</p> */}
                    </div>
                </section>

                {/* Contact Info */}
                <section>
                    <h3 className="font-semibold text-lg mb-2">Contact Information</h3>

                    <div className="space-y-1 text-sm">
                        {/* <p><strong>Contact Name:</strong> {currentBusiness!.contactName || "N/A"}</p> */}
                        <p><strong>Email:</strong> {currentBusiness!.email || "N/A"}</p>
                        <p><strong>Phone 1:</strong> {currentBusiness!.phoneNumber1 || "N/A"}</p>
                        {/* <p><strong>Phone 2:</strong> {currentBusiness!.phoneNumber2 || "N/A"}</p> */}
                        {/* <p><strong>Address:</strong> {currentBusiness!.address || "N/A"}</p> */}
                        <p><strong>City:</strong> {currentBusiness!.city || "N/A"}</p>
                        {/* <p><strong>State:</strong> {currentBusiness!.state || "N/A"}</p>
                                <p><strong>Country:</strong> {currentBusiness!.country || "N/A"}</p>
                                <p><strong>Pincode:</strong> {currentBusiness!.pincode || "N/A"}</p> */}
                    </div>
                </section>

                {/* Stats */}
                <section>
                    <h3 className="font-semibold text-lg mb-2">Business Stats</h3>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 rounded-lg bg-neutral-800 border border-white/10">
                            {/* <p className="text-2xl font-bold">
                                            {currentBusiness!.googleLocations?.length || 0}
                                        </p> */}
                            <p className="text-sm">Locations</p>
                        </div>

                        <div className="p-4 rounded-lg bg-neutral-800 border border-white/10">
                            {/* <p className="text-2xl font-bold">
                                            {currentBusiness!.users?.length || 0}
                                        </p> */}
                            <p className="text-sm">Users</p>
                        </div>

                        <div className="p-4 rounded-lg bg-neutral-800 border border-white/10">
                            <p className="text-2xl font-bold">
                                {currentBusiness!.isActive ? "Active" : "Inactive"}
                            </p>
                            <p className="text-sm">Status</p>
                        </div>
                    </div>
                </section>

                {/* Timestamps */}
                <section className="text-sm text-muted-foreground">
                    <p>
                        <strong>Created:</strong>{" "}
                        {new Date(currentBusiness!.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Updated:</strong>{" "}
                        {new Date(currentBusiness!.updatedAt).toLocaleString()}
                    </p>
                </section>
            </CardContent>
        </Card>

    );
}
