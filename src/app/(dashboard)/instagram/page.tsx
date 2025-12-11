"use client";

export default function OverviewPage() {
    return (
        <div className="space-y-8">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Followers Trend</p>
                    <div className="h-16 flex items-center justify-center text-blue-500">📈</div>
                    <p className="text-sm font-medium mt-2">+1.8%</p>
                </div>

                <div className="border rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-semibold mt-3">5.2%</p>
                </div>

                <div className="border rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Last 30 Days Reach</p>
                    <p className="text-2xl font-semibold mt-3">45k</p>
                </div>

                <div className="border rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Latest Comments</p>
                    <ul className="mt-3 text-sm space-y-1">
                        <li>💬 Looks delicious! 😍</li>
                        <li>💬 Yum! Your food is amazing…</li>
                        <li>💬 Great atmosphere!</li>
                    </ul>
                </div>
            </div>

            {/* Top Posts + Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-lg font-medium mb-3">Top Performing Posts</h4>
                    <div className="flex gap-3">
                        <div className="h-24 w-24 bg-muted rounded-lg"></div>
                        <div className="h-24 w-24 bg-muted rounded-lg"></div>
                        <div className="h-24 w-24 bg-muted rounded-lg"></div>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium mb-3">Alerts</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                        <li>Posts are less frequent than usual</li>
                        <li>Hashtag drop in engagement detected</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}
