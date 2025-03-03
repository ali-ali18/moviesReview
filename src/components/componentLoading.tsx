export default function ComponentLoading() {
    return (
        <div className="flex items-center justify-center space-x-2 min-h-screen">
            <div className="animate-bounce bg-purple-700 rounded-full h-3 w-3 " />
            <div className="animate-bounce bg-purple-700 rounded-full h-3 w-3 delay-200 " />
            <div className="animate-bounce bg-purple-700 rounded-full h-3 w-3 delay-400" />
        </div>
    )
}