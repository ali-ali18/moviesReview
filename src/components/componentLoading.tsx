import { Skeleton } from "./ui/skeleton";

export default function ComponentLoading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
            {Array.from({ length: 20 }).map((_) => (
                <div key={`${Math.random()}`}>
                    <Skeleton className="w-full md:w-[264px] h-[450px]" />
                </div>
            ))}
        </div>
    )
}