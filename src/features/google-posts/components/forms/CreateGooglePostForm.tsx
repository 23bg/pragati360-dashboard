"use client";

import React from "react";
import { useGooglePosts } from "@/features/google-posts/hooks/useGooglePosts";
import { GooglePostSchema, GooglePostFormType } from "@/features/google-posts/validations/google-post.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface CreateGooglePostFormProps {
    locationId: string;
    accountId: string;
    onSuccess?: () => void;
}

export const CreateGooglePostForm: React.FC<CreateGooglePostFormProps> = ({
    locationId,
    accountId,
    onSuccess,
}) => {
    const { createPost, loading, successMessage, error, clearMessages } =
        useGooglePosts();

    const form = useForm<GooglePostFormType>({
        resolver: zodResolver(GooglePostSchema),
        defaultValues: {
            title: "",
            summary: "",
            postType: "UPDATE",
            mediaUrls: [],
            startTime: "",
            endTime: "",
        },
    });

    React.useEffect(() => {
        if (successMessage && onSuccess) {
            onSuccess();
            clearMessages();
        }
    }, [successMessage]);

    const onSubmit = (values: GooglePostFormType) => {
        createPost({
            ...values,
            googleLocationId: locationId,
            googleAccountId: accountId,
        });
    };

    return (
        <Card className="w-full bg-neutral-900 border border-white/10">
            <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Create Google Post</h2>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label className="text-white">Title</Label>
                        <Input
                            {...form.register("title")}
                            placeholder="Post title"
                            className="bg-neutral-800 text-white border-white/10"
                        />
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                        <Label className="text-white">Summary</Label>
                        <Textarea
                            {...form.register("summary")}
                            placeholder="Post summary"
                            className="bg-neutral-800 text-white border-white/10"
                        />
                    </div>

                    {/* Post Type */}
                    <div className="space-y-2">
                        <Label className="text-white">Post Type</Label>
                        <Select
                            defaultValue="UPDATE"
                            onValueChange={(v) => form.setValue("postType", v)}
                        >
                            <SelectTrigger className="bg-neutral-800 text-white border-white/10">
                                <SelectValue placeholder="Choose type" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900">
                                <SelectItem value="UPDATE">Update</SelectItem>
                                <SelectItem value="EVENT">Event</SelectItem>
                                <SelectItem value="OFFER">Offer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Media URLs */}
                    <div className="space-y-2">
                        <Label className="text-white">Media URLs</Label>

                        {form.watch("mediaUrls")?.map((url, i) => (
                            <Input
                                key={i}
                                value={url}
                                onChange={(e) => {
                                    const updated = [...form.getValues("mediaUrls")];
                                    updated[i] = e.target.value;
                                    form.setValue("mediaUrls", updated);
                                }}
                                placeholder="https://image-url.com/img.png"
                                className="bg-neutral-800 text-white border-white/10 mb-2"
                            />
                        ))}

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                                form.setValue("mediaUrls", [...form.getValues("mediaUrls"), ""])
                            }
                        >
                            + Add Image URL
                        </Button>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-white">Start Time</Label>
                            <Input
                                type="datetime-local"
                                {...form.register("startTime")}
                                className="bg-neutral-800 text-white border-white/10"
                            />
                        </div>

                        <div>
                            <Label className="text-white">End Time</Label>
                            <Input
                                type="datetime-local"
                                {...form.register("endTime")}
                                className="bg-neutral-800 text-white border-white/10"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold"
                    >
                        Create Post
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
