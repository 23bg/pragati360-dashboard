"use client";

import React from "react";
import Image from "next/image";
import { Heart, MessageCircle, PlayCircle } from "lucide-react";

const mockPosts = [
    {
        id: "1",
        mediaUrl: "https://picsum.photos/200/300?grayscale",
        type: "image",
        likes: 320,
        comments: 54,
    },
    {
        id: "2",
        mediaUrl: "https://picsum.photos/200/300?grayscale",
        type: "video",
        likes: 1200,
        comments: 340,
    },
    {
        id: "3",
        mediaUrl: "https://picsum.photos/200/300?grayscale",
        type: "image",
        likes: 850,
        comments: 128,
    },
    {
        id: "4",
        mediaUrl: "https://picsum.photos/200/300?grayscale",
        type: "image",
        likes: 420,
        comments: 60,
    },
    {
        id: "5",
        mediaUrl: "https://picsum.photos/200/300?grayscale",
        type: "video",
        likes: 2100,
        comments: 410,
    },
];

export default function InstagramPostsPage() {
    const [posts, setPosts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // simulate loading
        const timeout = setTimeout(() => {
            setPosts(mockPosts);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="space-y-6">

            <h2 className="text-xl font-semibold">Posts</h2>

            {/* Skeleton Loading */}
            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-40 w-full bg-muted animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            )}

            {/* Posts Grid */}
            {!loading && posts.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="relative group cursor-pointer rounded-lg overflow-hidden"
                        >
                            <Image
                                src={post.mediaUrl || "https://picsum.photos/200/300?grayscale"}
                                alt="IG Post"
                                width={300}
                                height={300}
                                className="object-cover w-full h-40 transition-all group-hover:scale-105"
                            />

                            {/* Video Icon */}
                            {post.type === "video" && (
                                <div className="absolute top-2 right-2 bg-black/40 p-1 rounded-full">
                                    <PlayCircle className="w-5 h-5 text-white" />
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-all">
                                <div className="flex items-center gap-1 text-white">
                                    <Heart className="w-5 h-5" /> {post.likes}
                                </div>
                                <div className="flex items-center gap-1 text-white">
                                    <MessageCircle className="w-5 h-5" /> {post.comments}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Posts */}
            {!loading && posts.length === 0 && (
                <p className="text-muted-foreground text-center py-10">No posts found.</p>
            )}
        </div>
    );
}
