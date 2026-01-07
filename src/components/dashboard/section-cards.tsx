import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/features/dashboard/services/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

export function SectionCards() {
    const { data, isLoading, isError } = useGetDashboardStatsQuery();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                    <Card key={index} className="@container/card">
                        <CardHeader>
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-5 w-1/4" />
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center">
                Failed to load dashboard statistics.
            </div>
        );
    }

    // Assuming data.data.cards contains the array of StatCard
    const cardsData = data?.data?.cards || [];

    if (cardsData.length === 0) {
        return (
            <div className="text-center text-muted-foreground">
                No dashboard statistics available.
            </div>
        );
    }

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {cardsData.map((card, index) => (
                <Card key={index} className="@container/card">
                    <CardHeader>
                        <CardDescription>{card.label}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.value}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                {card.trend === "up" ? (
                                    <IconTrendingUp />
                                ) : card.trend === "down" ? (
                                    <IconTrendingDown />
                                ) : null}
                                {card.percentageChange}
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {card.description}
                            {card.trend === "up" ? (
                                <IconTrendingUp className="size-4" />
                            ) : card.trend === "down" ? (
                                <IconTrendingDown className="size-4" />
                            ) : null}
                        </div>
                        {/* You might want to add another description from your data here if available */}
                        {/* <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div> */}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
